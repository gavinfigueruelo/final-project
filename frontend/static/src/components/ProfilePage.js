import React, { Component } from "react";
import Profile from "./Profile";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/plants/plant/");
      const plant = await res.json();
      this.setState({
        plant,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div namespace="profile_container">
        <h1> Welcome to the Plant Community!</h1>
        <div>
        {this.state.plant.map(item => (
          <div key={item.id}>
          <h1>{item.common_name}</h1>
          <p>{item.family}</p>
          <p>{item.image_url}</p>
          <p>{item.publication_year}</p>
          </div>
        ))}
        </div>
        <Profile/>
      </div>
    );
  }
}
export default ProfilePage;
