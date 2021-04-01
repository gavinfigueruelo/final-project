import React, { Component } from "react";
import Profile from "./Profile";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      notes: [],
    };
    this.fetchPlants = this.fetchPlants.bind(this);
    this.fetchNotes = this.fetchNotes.bind(this);
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
      <div namespace="profile_container">
        <Profile />
        <div className='profile-card row px-4'>
        <div className='col-3 px-2' >
          {this.state.plants.map((item) => (
            <div className='card plantprof' key={item.id}>
              <h1 className="card-title">{item.common_name}</h1>
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
