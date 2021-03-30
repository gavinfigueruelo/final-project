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
    this.clickLogin = this.clickLogin.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  

  clickLogin(){
  const login = this.state.clickLogin;
  if(login === false)
  this.setState({clickLogin: true})
  else if(login === true)
  this.setState({clickLogin: false})
}


clickRegister(){
  const register = this.state.clickRegister;
  if(register === false)
  this.setState({clickRegister: true})
  else if(register === true)
  this.setState({clickRegister: false})
}

render(){
  return(
    <div class='login_outer'>
    <form className="loginform" onSubmit={(e) => this.props.handleLogin(e, this.state)}>
      <input type="text" name="username" value={this.state.username} placeholder="username" onChange={this.handleInput}/><br/>
      <input type="email" name="email" value={this.state.email} placeholder="email" onChange={this.handleInput}/><br/>
      <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleInput}/><br/>
      <button className="btn" type="submit">Login</button>
    </form>
    </div>
  );
}
}

export default Login;
