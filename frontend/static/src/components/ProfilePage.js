import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Profile from "./Profile";
import Cookies from "js-cookie";


const endpoint = "/api/v1/user/plants/note/";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state ={
      entry: this.props.note.entry,
      upload: null,
      isEditing: false,
    }
    this.editNote = this.editNote.bind(this);
    this.handleInput = this.handleInput.bind(this);
    // this.removeNote = this.removeNote.bind(this);
}

editNote(note){
  const entry =  [...this.state.entry]
  this.setState({ entry})

  fetch(`${endpoint}edit/`, {
        method: 'PUT',
        headers: {
          'X-CSRFToken' : Cookies.get('csrftoken'),
        },
        body: note
      })
        .then(response => {
        if(!response.ok){
          throw new Error ('Bad Post request');
        }
        return response.json()
        })
      .then(data => console.log('Success. Note Updated!'))
      .catch(error => console.log('Error:', error))
      .finally('I am always going to fire!');
  };

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async saveNote

  render() {
    return(
      <>
      {this.state.isEditing
        ?
        <input type="text" name="entry" value={this.state.entry} onChange={this.handleInput}/>
        :
        <>
          {this.props.note.entry && <p>{this.props.note.entry}</p>}
          {this.props.note.upload && <img src={this.props.note.upload} />}
        </>
      }

      {this.state.isEditing

        ?
          <Button variant="secondary" onClick={this.editNote}>save</Button>
        :
          <Button variant="secondary" onClick={() => this.setState({isEditing: true})}>edit</Button>
      }


      <Button variant="danger" onClick={() => this.props.removeNote(this.props.note.id)}>delete</Button>

      </>
    )
  }
}

class Plant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      entry: "",
      upload: null,
      preview: "",
      showNotes: false,
      id: this.props.plant.id,
      common_name: this.props.plant.common_name,
      image_url: this.props.plant.image_url,
      image: this.props.plant.image,
      family: this.props.plant.family,
      publication_year: this.props.plant.publication_year,
      notes: this.props.plant.notes || [],
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async addNote() {
    const formData= new FormData();
    // console.log(this.props.plant)
    formData.append("plant", this.state.id );
    if(this.state.entry.length){
      formData.append("entry", this.state.entry );
    }
    if(this.state.upload){
      formData.append("upload", this.state.upload );
    }

    const options = {
        method: "POST",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: formData,
      }
    const response = await fetch(`/api/v1/user/plants/note/`, options);
    if(response.status === 201) {
      const data = await response.json().catch((error) => console.log(error));
      const notes = [...this.state.notes];
      notes.push(data);
      this.setState({show: false, entry: "", upload: null, preview: "", notes});
    }
  }

  async removeNote(id) {

    // user/plants/note/<int:pk>/


    const options = {
        method: "DELETE",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      }
    const response = await fetch(`/api/v1/user/plants/note/${id}/`, options);

    if(response.status === 204) {
      const notes = [...this.state.notes];
      const index = notes.findIndex(note => note.id === id);
      notes.splice(index, 1);
      this.setState({show: false, entry: "", upload: null, preview: "", notes});
    }
  }

  handleImage(event) {
    let file = event.target.files[0];
    this.setState({ upload: file });
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ preview: reader.result });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const notes = this.state.notes.map(note => <Note key={note.id} note={note} removeNote={this.removeNote}/>);
    return(
      <>
      <div className='card plantprof' key={this.state.id}>
        {this.state.image && <img className='card-img-top' src={this.state.image} alt="plant" />}
        {!this.state.image && this.state.image_url && <img className='card-img-top' src={this.state.image_url} alt="plant" />}
        <h1 className="user-title">{this.state.common_name}</h1>
        <p>{this.state.family}</p>
        <p>{this.state.publication_year}</p>
        <button className="btn btn-light note-btn" onClick={() => this.setState({show: true})}>Add Note</button>
        <button className="btn btn-secondary note-btn" onClick={() => this.setState({showNotes: true})}>Show Notes</button>
        <button className="btn btn-secondary note-btn" onClick={() => this.props.removePlant(this.state.id)}>Remove Plant</button>
      </div>

      <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
        <Modal.Header closeButton>
          <Modal.Title>Add note below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              as="textarea"
              rows={3}
              name="entry"
              onChange={this.handleInput}
              value={this.state.entry}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            {this.state.upload && <img src={this.state.preview} />}
           <Form.File id="exampleFormControlFile1" label="Example file input" onChange={this.handleImage}/>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.addNote}>
            Save Note!
          </Button>
          <Button variant="secondary" onClick={() => this.setState({show: false})}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.showNotes} onHide={() => this.setState({showNotes: false})}>
      <Modal.Header closeButton>
        <Modal.Title>{this.state.common_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{notes}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => this.setState({showNotes: false})}>
          Close
        </Button>
      </Modal.Footer>

      </Modal>

      </>
    )
  }
}


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
    };
    this.fetchPlants = this.fetchPlants.bind(this);
    this.fetchNotes = this.fetchNotes.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addPlant = this.addPlant.bind(this);
    this.removePlant = this.removePlant.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async componentDidMount() {
    this.fetchPlants();
    this.fetchNotes();
  }

  async addPlant(plant) {
    console.log('plant', plant);
    const plants = [...this.state.plants];
    plants.push(plant);
    this.setState({plants});
  }

  async removePlant(id) {
    const options = {
        method: "DELETE",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      }
    const response = await fetch(`/api/v1/user/plants/${id}/`, options);
    if(response.status === 204) {
      const plants = [...this.state.plants];
      const index = plants.findIndex(plants => plants.id === id);
      plants.splice(index, 1);
      this.setState({show: false, entry: "", upload: null, preview: "", plants});
    }
  }

  async fetchPlants() {
    try {
      const res = await fetch("/api/v1/user/plants/");
      const plants = await res.json();
      console.log('plants', plants)
      this.setState({
        plants,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async fetchNotes() {
    try {
      const res = await fetch("/api/v1/user/plants/note/");
      const notes = await res.json();
      console.log('notes', notes)
      this.setState({
        notes,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="profile_container">
        <Profile addPlant={this.addPlant}/><br/>
        <div className='profile-card row px-4'>

        <div className='col-3 px-2' >
          {this.state.plants.map((plant) => (
            <Plant key={plant.id} plant={plant} addPlant={this.addPlant} removePlant={this.removePlant}/>
          ))}
          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
