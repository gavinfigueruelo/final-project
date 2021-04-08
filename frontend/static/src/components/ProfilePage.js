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
      entry: "",
      upload: null
    }
    this.editNote = this.editNote.bind(this);
    // this.removeNote = this.removeNote.bind(this);
}

editNote(note){
  const entry =  [...this.state.entry]
  const upload = [...this.state.upload]
  this.setState({ entry })
  fetch(`${endpoint}edit/`, {
        method: 'PUT',
        headers: {
          'X-CSRFToken' : Cookies.get('csrftoken'),
        },
        body: entry, upload
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

  // removeNote(chat){
  //   const chats = [...this.state.chats];
  //   notes.splice(index, 1);
  //   this.setState({ chats });
  //   fetch(`${endpoint}remove/${chat.id}`, {//type these out line by line some need more than others
  //         method: 'DELETE',
  //         headers: {
  //           'X-CSRFToken' : Cookies.get('csrftoken'),
  //         },
  //       })
  //         .then(response => {
  //         if(!response.ok){
  //           throw new Error ('Bad Post request');
  //         }
  //         })
  //       .catch(error => console.log('Error:', error))
  //       .finally('I am always going to fire!');
  //   };




  render() {
    return(
      <>
      <div>
      {this.props.note.entry}
      </div>
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
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSave() {
    const formData= new FormData();
    // console.log(this.props.plant)
    formData.append("plant", this.props.plant.id );
    if(this.state.entry.length){
      formData.append("entry", this.state.entry );
    }
    if(this.state.upload){
      formData.append("upload", this.state.uplaod );
    }
    this.props.saveNote(formData);
    this.setState({show: false, entry: "", upload: null, preview: ""})
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
    const notes = this.props.plant.notes.map(note => <Note note={note}/>);
    return(
      <>
      <div className='card plantprof' key={this.props.plant.id}>
        <img className='card-img-top' src={this.props.plant.image_url} alt="plant" />
        <h1 className="user-title">{this.props.plant.common_name}</h1>
        <p>{this.props.plant.family}</p>
        <p>{this.props.plant.publication_year}</p>
        <button className="btn btn-light note-btn" onClick={() => this.setState({show: true})}>Add Note</button>
        <button className="btn btn-light note-btn" onClick={() => this.setState({showNotes: true})}>Show Notes</button>
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
          <Button variant="primary" onClick={this.handleSave}>
            Save Note!
          </Button>
          <Button variant="secondary" onClick={() => this.setState({show: false})}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.showNotes} onHide={() => this.setState({showNotes: false})}>
      <Modal.Header closeButton>
        <Modal.Title>My Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{notes}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.editNote}>edit</Button>
        <Button variant="primary">Save</Button>
        <Button variant="danger">X</Button>
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
      notes: [],
    };
    this.fetchPlants = this.fetchPlants.bind(this);
    this.fetchNotes = this.fetchNotes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveNote = this.saveNote.bind(this);

  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async saveNote(note) {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: note,
      }
      const response = await fetch(`/api/v1/user/plants/note/`, options);
      if(response.status === 201) {
        const data = await response.json().catch((error) => console.log(error));
    }

  }

  async componentDidMount() {
    this.fetchPlants();
    this.fetchNotes();
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

  handleSubmit(event) {
    event.preventDefault();

    const note = {
      entry: this.state.entry,
    };
    console.log("message i sent", note);
    fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad Post request");
        }
        return response.json();
      })
      .then((data) => {
        this.props.addNotes(data);
        console.log("Message sent!", data);
      })
      .catch(error => console.log("Error:", error))
      .finally("I am always going to fire!");
    this.setState({ entry: "" })
  };


  addNotes(note) {
    const notes = [...this.state.notes];
    console.log("journaling", note);
    notes.push(note);
    this.setState({ notes });
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
        <Profile /><br/>
        <div className='profile-card row px-4'>
        <div className='col-3 px-2' >
          {this.state.plants.map((plant) => (
            <Plant saveNote={this.saveNote} editNote={this.editNote} plant={plant}/>
          ))}
          </div>
        </div>
      {/*  <div className='col-3 px-2' >
          {this.state.notes.map((item) => (
            <div className='card' key={item.plant}>
              <h1 className="card-title">{item.title}</h1>
              <p>{item.entry}</p>
              <img className='card-img-top' src={item.upload} alt="plant" />
            </div>
          ))}
          </div> */}
      </div>
    );
  }
}
export default ProfilePage;
