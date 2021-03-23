import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: "",
      bio: "",
    };
    this.handleImage = this.handleImage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImage(event) {
    let file = event.target.files[0];
    this.setState({ profile_picture: file });

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ preview: reader.result });
    };
    reader.readAsDataURL(file);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("profile_picture", this.state.profile_picture);
    formData.append("bio", this.state.bio);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("/api/v1/profiles/create/", options);
    const data = await response.json().catch((error) => console.log(error));
    console.log(data);
  }

  render() {
    return (
      <form className="profile_edit" onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Edit Your Profile</h2>
        {this.state.profile_picture && <img src={this.state.preview} />}
        <label className="form-label" htmlFor="profile_picture">
          Profile Picture
        </label>
        <input
          className="form"
          onChange={this.handleImage}
          type="file"
          name="profile_picture"
        />

        <label className="form-label" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="forml"
          onChange={this.handleInput}
          value={this.state.bio}
          name="bio"
        ></textarea>

        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
    );
  }
}

export default Profile;
