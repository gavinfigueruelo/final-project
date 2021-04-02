import React, { Component } from "react";
import Profile from "./Profile";
import Cookies from "js-cookie";


const endpoint = "/api/v1/user/plants/note/";

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

  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
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
        <Profile />
        <div className="note-sec">
        <input
          type="text"
          name="note"
          id="note-post"
          value={this.state.entry}
          onChange={this.handleInput}
          placeholder="type message here"
          required
        />
        <input type="file" className="note_post" onChange={this.handleInput}/>
        <button className="btn btn-light" type="submit" onClick={this.handleSubmit}>
          Save!
        </button>
        </div>
        <div className='profile-card row px-4'>
        <div className='col-3 px-2' >
          {this.state.plants.map((item) => (
            <div className='card plantprof' key={item.id}>
              <h1 className="user-title">{item.common_name}</h1>
              <p>{item.family}</p>
              <img className='card-img-top' src={item.image_url} alt="plant" />
              <p>{item.publication_year}</p>
            </div>
          ))}
          </div>
        </div>
        <div className='col-3 px-2' >
          {this.state.notes.map((item) => (
            <div className='card' key={item.plant}>
              <h1 className="card-title">{item.title}</h1>
              <p>{item.entry}</p>
              <img className='card-img-top' src={item.upload} alt="plant" />
            </div>
          ))}
          </div>
      </div>
    );
  }
}
export default ProfilePage;
