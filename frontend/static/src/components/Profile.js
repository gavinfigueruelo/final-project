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

      const res = await fetch("/api/v1/profiles/detail/");
      const profile = await res.json();
      console.log('profile', profile)
      this.setState({...profile});

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
    const user = this.state
    let formData = new FormData();
    formData.append("profile_picture", this.state.profile_picture);
    formData.append("bio", this.state.bio);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("/api/v1/profiles/update/", options);
    const data = await response.json().catch((error) => console.log(error));
    console.log('updated profile', data);

    this.setState({ isEditing: !this.state.isEditing, bio: data.bio, profile_picture: data.profile_picture});
    // const obj = {
    //   profile_picture: user.profile_picture,
    //   bio: user.bio,
    // };
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": Cookies.get("csrftoken"),
    //   },
    //   body: JSON.stringify(obj),
    // };
    // const response = await fetch("/api/v1/profiles/update/", options);
    // console.log(response)
    // window.location.reload();

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
          <div key={this.state.id}>
            <h1> {this.state.username}</h1>
            <img className='card-profile' src={this.state.profile_picture} alt="profilepicture here" />
            <p>{this.state.bio}</p>
          </div>
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
