import React, { Component } from "react";
import Cookies from "js-cookie";

const endpoint = "/api/v1/community/";

class CommunityPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      post: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addMessages = this.addMessages.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const message = {
      text: this.state.text,
    };
    console.log("message i sent", message);
    fetch(`${endpoint}create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad Post request");
        }
        return response.json();
      })
      .then((data) => {
        this.props.addMessages(data);
        console.log("Message sent!", data);
      })
      .catch((error) => console.log("Error:", error))
      .finally("I am always going to fire!");
    this.setState({ post: "" });
  }

  componentDidMount() {
    fetch(`${endpoint}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("response", result);
          this.setState({
            messages: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }
  addMessages(message) {
    const messages = [...this.state.messages];
    console.log("messaging", message);
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div namespace="container_post">
        <form className="form">
          <div className="com_post">
            <label htmlFor="community-post">
              Ask a Question, Share a Thought, or Post a Picture of Your Plant!
            </label>
            <br />
            <input
              type="text"
              name="post"
              id="community-post"
              value={this.state.post}
              onChange={this.handleInput}
              placeholder="type message here"
              required
            />
            <input type="file" namespace="file_post" />
            <button type="submit" onChange={this.handleSubmit}>
              Post!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CommunityPost;
