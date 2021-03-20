import React, { Component } from "react";
// import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e.target.files;
  if (file) {
    const reader = new FileReader();
    const{current} = uploadedImage;
    current.file = file;
    reader.onload = (e) => {
      current.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  }

  componentDidMount() {
    const response = fetch("/rest-auth/user/");
    // const data = response.json();
    console.log(response);
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Username</h1>
          <div classname="profpic">
            <input type='file' accept='image/*' multiple='False'/>
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
