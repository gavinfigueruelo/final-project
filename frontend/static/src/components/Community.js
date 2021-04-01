import React, { Component } from 'react';
import CommunityPage from './CommunityPage';
import CommunityPost from './CommunityPost';


class Community extends Component {

render(){
  return (
    <div>
      <h1> Welcome to the Plant Community!</h1>
      <CommunityPost/>
      <CommunityPage/>
    </div>
  );
}
}

export default Community;
