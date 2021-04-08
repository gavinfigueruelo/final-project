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
    <>
    {this.state.chats.map(item => (
    <div className="card-columns">
    <div className="card text-center" key={this.state.id}>
      <div className="card-img-top">
        {item.image_upload && <img src={item.image_upload} alt="plant"  />}
      </div>
      <div className="card-body d-flex flex-column">
        <h1 className="card-title">{item.author}</h1>
        <p>{item.post}</p>
        <button className="btn btn-link" type="submit" onClick={() => this.setState({ isEditing: !this.state.isEditing})} >
        DELETE
        </button>
      </div>
      </div>
      </div>
        ))}
    </>




      /*
    <div className="pagepost">
      <div className="message-box">
      {this.state.chats.map(item => (
        <div className='card messages' key={item.id}>
        <p>{item.post}</p>
        {item.image_upload && <img src={item.image_upload} alt="plant"  />}
        <p>{item.author}</p>
        </div>
      ))}
      </div>
    </div>*/
  )
}
}
export default CommunityPage;
