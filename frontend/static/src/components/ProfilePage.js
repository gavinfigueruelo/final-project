import React, { Component } from 'react';
import Profile from './Profile';


class ProfilePage extends Component {
  constructor(props) {
    super(props);

  }



render(){
  return(
    <div namespace="profile_container">
      <h1> Welcome to the Plant Community!</h1>
      <Profile/>
    </div>
  );
}
}
export default ProfilePage;
