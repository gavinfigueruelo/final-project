import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Profile from "./Profile";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {faSave} from '@fortawesome/free-solid-svg-icons';



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

async editNote(){

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
    body: JSON.stringify({entry: this.state.entry}),
  };

  const response = await fetch(`/api/v1/user/plants/note/${this.props.note.id}/`, options);
  console.log(response);
  if(response.status) {
    const json = await response.json();
    this.setState({isEditing: false});
  }
}

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }


  render() {
    return(
      <>
      <div className="d-flex align-items-baseline">
      {this.state.isEditing
        ?
        <>
        <textarea className="mr-3" type="text" name="entry" value={this.state.entry} onChange={this.handleInput}></textarea>
        <Button className="note-buttons ml-auto" variant="secondary" onClick={this.editNote}><FontAwesomeIcon icon={faSave} /></Button>
        </>
        :
        <>
          {this.state.entry && <p style={{'font-size': '25px', 'margin-right': '1rem'}}>{this.state.entry}</p>}
          <Button className="note-buttons ml-auto" variant="secondary" onClick={() => this.setState({isEditing: true})}><FontAwesomeIcon icon={faPencilAlt} /></Button>
        </>
      }
        <Button className="note-buttons" variant="danger" onClick={() => this.props.removeNote(this.props.note.id)} ><FontAwesomeIcon icon={faTrash} /></Button>
      </div>
      {this.props.note.upload && <img className="mb-2" src={this.props.note.upload} />}
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
        <div className="note-buttons">
          <button className="btn btn-success note-btn" onClick={() => this.setState({show: true})}><FontAwesomeIcon icon={faEdit} /></button>
          <button className="btn btn-secondary note-btn" onClick={() => this.setState({showNotes: true})}><FontAwesomeIcon icon={faClipboardList} /></button>
          <button className="btn btn-danger note-btn" onClick={() => this.props.removePlant(this.state.id)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
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
        {notes}
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
      <div className="profile_container card-columns p-4">
        <Profile addPlant={this.addPlant}/>
        {this.state.plants.map((plant) => (
          <Plant key={plant.id} plant={plant} addPlant={this.addPlant} removePlant={this.removePlant}/>
        ))}
      </div>
    );
  }
}
export default ProfilePage;
