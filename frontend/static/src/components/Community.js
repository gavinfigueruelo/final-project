import React, { Component } from 'react';
import CommunityPage from './CommunityPage';
import CommunityPost from './CommunityPost';


class Community extends Component {
  constructor(props) {
    super(props);

  }

render(){
  return (
    <div>
      <CommunityPage/>
      <CommunityPost/>
    </div>
  );
}
}

export default Community;
