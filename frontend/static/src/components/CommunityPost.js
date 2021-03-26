import React, { Component } from 'react';
import Cookies from "js-cookie";


const endpoint = '/api/v1/community/'

class CommunityPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',

    }
  }

  handleSubmit(event){
    event.preventDefault();

  const message = {
      text: this.state.text,
       }
    console.log('message i sent', message)
      fetch(`${endpoint}create/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken' : Cookies.get('csrftoken'),
            },
            body: JSON.stringify(message),
          })
            .then(response => {
            if(!response.ok){
              throw new Error ('Bad Post request');
            }
            return response.json()
            })
          .then(data => {
            this.props.addMessage(data);
            console.log('Message sent!', data)})
          .catch(error => console.log('Error:', error))
          .finally('I am always going to fire!');
          this.setState({text: ""})
          };


render(){
  return (
    <div namespace="container_post">
      <form>
        <div namespace="community_post">
          <label>Ask a Question, Share a Thought, or Post a Picture of Your Plant!</label><br/>
          <input type="text" namespace="text_post"/>
          <input type="file" namespace="file_post"/>
        </div>
      </form>
    </div>
  );
  }
}

export default CommunityPost;
