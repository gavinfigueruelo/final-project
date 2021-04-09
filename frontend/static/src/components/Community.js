import React, { Component } from 'react';
import CommunityPage from './CommunityPage';
import CommunityPost from './CommunityPost';
import Cookies from "js-cookie";


class Community extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }

    this.addPost = this.addPost.bind(this);
    this.removePost = this.removePost.bind(this);

  }

  addPost(post) {
    const posts = [...this.state.posts];
    posts.unshift(post);
    this.setState({posts});
  }

  async removePost(id) {
    const options = {
        method: "DELETE",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      }
    const response = await fetch(`/api/v1/community/${id}/`, options);
    if(response.status === 204) {
    const posts = [...this.state.posts];
    const index = posts.findIndex(post => post.id === id);
    posts.splice(index, 1);
    this.setState({posts});
  }
}


  async componentDidMount() {
    const res = await fetch("/api/v1/community/");
    const posts = await res.json();
    this.setState({posts})
  }

render(){
  return (
    <div>
      <h1 className="welcome"> Welcome to the Plant Community!</h1>
      <CommunityPost addPost={this.addPost}/>
      <CommunityPage posts={this.state.posts} removePost={this.removePost}/>
    </div>
  );
}
}

export default Community;
