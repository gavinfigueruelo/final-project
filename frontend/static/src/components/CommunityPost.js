import React, { Component } from 'react';


class CommunityPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',

    }
  }
}

render(){
  return (
    <div namespace="container">
      <form>
        <textarea namespace="community_post">
          <label>Ask a Question, Share a Thought, or Post a Picture of Your Plant!</label><br>
          <input type="text" namespace="text_post"/>
          <input type="file" namespace="file_post"/>
        </textarea>
      </form>
    </div>
  )
}

export default CommunityPage;
