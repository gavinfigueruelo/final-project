import React, { Component } from "react";
import Cookies from "js-cookie";



class CommunityPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      image_upload: null,
      preview: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('post', this.state.post);

    if(this.state.image_upload) {
      formData.append('image_upload', this.state.image_upload)
    }

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    }


    const response = await fetch(`/api/v1/community/`, options);

    if(response.status === 201) {
      const json = await response.json();
      this.props.addPost(json);
      this.setState({post: '' , image_uplaod: null, preview: ''});
    }
  };

  handleImage(event) {

      let file = event.target.files[0];
      this.setState({ image_upload: file });

      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ preview: reader.result });
      };
      reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="container_post">
        <form className="form_post" onSubmit={this.handleSubmit}>
          <div className="com_post">
            <label className="post-info" htmlFor="community-post">
              Ask a Question, Share a Thought, or Post a Picture of Your Plant!
            </label>
            <br />
            {this.state.image_upload && <img src={this.state.preview} />}
            <textarea rows="3" columns="10" name="post" id="community-post" value={this.state.post} onChange={this.handleInput}
            placeholder="type message here" className="message-input"
            required />

            <input type="file" className="file_post" onChange={this.handleImage}/>
            <div className="post-btn">
            <button className="btn btn-light" type="submit">
              Post!
            </button>
           </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CommunityPost;
