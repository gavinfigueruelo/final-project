import React, { Component } from 'react';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',

    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

render(){
  return(
    <div class='login_outer'>
    <form className="loginform" onSubmit={(e) => this.props.handleLogin(e, this.state)}>
      <input type="text" className="username_input" value={this.state.username} placeholder="username" onChange={this.handleInput}/><br/>
      <input type="email" className="email_input" value={this.state.email} placeholder="email" onChange={this.handleInput}/><br/>
      <input type="password" className="password_input" value={this.state.password} placeholder="password" onChange={this.handleInput}/><br/>
      <button className="login_btn" >Login</button>
    </form>
    </div>
  );
}
}

export default Login;
