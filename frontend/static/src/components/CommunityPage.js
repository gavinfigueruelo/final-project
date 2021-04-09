import React, { Component } from 'react';


class CommunityPage extends Component {

render(){
  return(
    <>
    <div className="m-4">
    {this.props.posts.map(post => (

      <div className="card community-card mb-3" key={post.id}>
        {post.image_upload && <img className="community_picture_post" src={post.image_upload} alt="plant"  />}
        <div class="card-body">
          <p class="card-text">{post.post}</p>
          <div className="d-flex align-items-baseline">
            <span>{post.author}</span>
            {post.is_author && <button className="btn btn-link ml-auto" type="button" onClick={() => this.props.removePost(post.id)}>Delete</button>}
          </div>
        </div>
      </div>
        ))
      }
      </div>
    </>
    )
  }
}

export default CommunityPage;
