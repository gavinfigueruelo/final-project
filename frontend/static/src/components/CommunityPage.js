import React, { Component } from 'react';


class CommunityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    }

  }

  async componentDidMount() {
    try {
      const res = await fetch("/api/v1/community/");
      const chats = await res.json();
      this.setState({
        chats,
      });
    } catch (e) {
      console.log(e);
    }
  }


render(){
  return(
    <div namespace="pagepost">
      <h1> Welcome to the Plant Community!</h1>
      <div className="message-box">
      {this.state.chats.map(item => (
        <div key={item.api_id}>
        <h1>{item.title}</h1>
        <p>{item.post}</p>
        <img src={item.image_upload} alt="plant"/>
        <p></p>
        <p>{item.author}</p>
        </div>
      ))}
      </div>
    </div>
  )
}
}
export default CommunityPage;
