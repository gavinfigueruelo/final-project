import React, { Component } from "react";
// import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const response = await fetch("/rest-auth/user/");
    const data = await response.json();
    console.log(data);
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Username</h1>
          <div classname="profpic">
            <img src="#" alt="user" />
          </div>
          <div classname="bio">
            <p>My Bio:</p>
          </div>
        </div>
        <div className="my_plants">
          <label htmlFor="myplants">My Plants</label>
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default Profile;
