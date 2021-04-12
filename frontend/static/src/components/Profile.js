import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      profile_picture: null,
      profilePreview: '',
      bio: "",
      profile: [],
      show: false,
      common_name: '',
      family: '',
      publication_year: '',
      image: null,
      plantPreview: '',

    };
    this.handleImage = this.handleImage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPlant = this.addPlant.bind(this);
  }

  async componentDidMount() {

      const res = await fetch("/api/v1/profiles/detail/");
      const profile = await res.json();
      console.log('profile', profile)
      this.setState({...profile});

  }

  handleImage(event) {
    if(event.target.name === 'profile-image') {
      let file = event.target.files[0];
      this.setState({ profile_picture: file });

      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ profilePreview: reader.result });
      };
      reader.readAsDataURL(file);
    } else if(event.target.name === 'plant-image') {
      let file = event.target.files[0];
      this.setState({ image: file });

      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ plantPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }

  }

//   async getImage(item) {
//     try {
//         return {this.state.profile_picture};
//     }
//     catch (e) {
//         return ('./images/defaultprofile.png');
//     }
// }

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

  async addPlant() {
    const formData = new FormData();

    if(this.state.common_name.length !== 0) {
      formData.append('common_name', this.state.common_name);
    }
    if(this.state.family.length !== 0) {
      formData.append('family', this.state.family);
    }
    if(this.state.image !== null) {
      formData.append('image', this.state.image);
    }
    if(this.state.publication_year.length !== 0) {
      const publication_year = Number(this.state.publication_year);
      formData.append('publication_year', publication_year);
    }

    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    };

    const response = await fetch('/api/v1/user/plants/', options);
    if(response.status === 201) {

      const json = await response.json();
      this.props.addPlant(json);
      this.setState({common_name: '', family: '', image: null, publication_year: '', show: false});
    }
  }

  render() {
    return (
      <div className="card profile_edit">


        {this.state.isEditing
          ?
          <>
            <div className="card edit-view">
              <input
                className="form_edit_profile"
                onChange={this.handleImage}
                type="file"
                name="profile-image"
                onKeyUp={(event) => this.handleEdit(event)}
              />
                {this.state.profile_picture && <img src={this.state.profilePreview} />}
              <p className="profile_picture_edit">Upload A Profile Picture</p>
            </div>

            <div className="bio_edit_view">
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
        <div className="prof-col">
        <div className="text-center" key={this.state.id}>
          <div className="card-img-top top-pic">
            <img className='card-profile' src={this.state.profile_picture} alt="defaultprofile.png" />
          </div>
          <div className="card-body d-flex flex-column">
            <h1 className="card-title"> {this.state.username}</h1>
            <p>{this.state.bio}</p>
            <div className="profile-btns">
            <button className="btn btn-light m-2 edit-prof-btn" type="submit" onClick={() => this.setState({ isEditing: !this.state.isEditing})} >
            Edit
            </button>
            <button className="btn btn-light m-2 add_plant_btn" type="submit" onClick={() => this.setState({ show: true})} >
            Add Plant
            </button>
          </div>

            <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
              <Modal.Header closeButton>
                <Modal.Title>Add plant below</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Common Name"
                    name="common_name"
                    onChange={this.handleInput}
                    value={this.state.common_name}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Family"
                    name="family"
                    onChange={this.handleInput}
                    value={this.state.family}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Publication Year"
                    name="publication_year"
                    onChange={this.handleInput}
                    value={this.state.publiction_year}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  {this.state.image && <img src={this.state.plantPreview} />}3
                 <Form.File name="plant-image" id="exampleFormControlFile1" label="Example file input" onChange={this.handleImage}/>
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.addPlant}>
                  Add plant!
                </Button>
                <Button variant="secondary" onClick={() => this.setState({show: false})}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          </div>
          </div>
        </>
        :
        null

      }
  </div>
)
}
}

export default Profile;
