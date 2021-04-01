import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      profile_picture: "",
      bio: "",
      profile: [],
    };
    this.handleImage = this.handleImage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await fetch("/api/v1/profiles/");
      const profile = await res.json();
      console.log('profile', profile)
      this.setState({
        profile,
      });
    } catch (e) {
      console.log(e);
    }
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

  handleEdit(event){
      if(event.keyCode === 13) {
        this.setState({ isEditing: false });
      }
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

    const response = await fetch("/api/v1/profiles/", options);
    const data = await response.json().catch((error) => console.log(error));
    console.log(data);

    this.setState({ isEditing: !this.state.isEditing})
  }

  render() {
    return (
      <div className="profile_edit">


        {this.state.isEditing
          ?
          <>
            <div>
              <input
                className="form"
                onChange={this.handleImage}
                type="file"
                name="profile_picture"
                onKeyUp={(event) => this.handleEdit(event)}
              />

              <p className="profile_picture_edit">profile picture</p>
            </div>

            <div>
                <input
                className="form-bio"
                onChange={this.handleInput}
                value={this.state.bio}
                name="bio"
                onKeyUp={(event) => this.handleEdit(event)}
               />
              <p>bio</p>
              <button className="btn btn-submit" type="button" onClick={(e) => this.handleSubmit(e)} >save</button>
            </div>
          </>
          :
          null
    }


      {!this.state.isEditing
        ?
        <>
        <div className='profile-info'>
        {this.state.profile.map((item) => (
          <div key={item.id}>
            <h1> {item.username}</h1>
            <img className='card-profile' src={item.profile_picture} alt="profilepicture here" />
            <p>{item.bio}</p>
          </div>
        ))}
        </div>

        <button className="btn btn-link" type="submit" onClick={() => this.setState({ isEditing: !this.state.isEditing})} >
          Edit
        </button>
        </>
        :
        null

      }
  </div>
)
}
}

export default Profile;
