import React, { Component } from "react";
import Profile from "./Profile";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: []
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch("/api/v1/user/plants/");
      const plants = await res.json();
      this.setState({
        plants,
      });
    } catch (e) {
      console.log(e);
    }
  }



  render() {
    return (
      <div namespace="profile_container">
        <h1> Welcome to the Plant world!</h1>
        <Profile/>
        <div>
        {this.state.plants.map(item => (
          <div key={item.id}>
          <h1>{item.common_name}</h1>
          <p>{item.family}</p>
          <img src={item.image_url} alt="plant" />
          <p>{item.publication_year}</p>
          </div>
        ))}
        </div>
      </div>
    );
  }
}
export default ProfilePage;
