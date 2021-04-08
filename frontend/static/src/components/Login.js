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
    <form className="loginform mt-4 py-5" onSubmit={(e) => this.props.handleLogin(e, this.state)}>
      <div className="form-group">
        <label className="login-label" htmlFor="username-login">Username</label>
        <input name="username" type="text" id="username-login" className="form-control login-ctrl" value={this.state.username} placeholder="username" onChange={this.handleInput}/>
      </div>
      <div className="form-group">
        <label className="login-label" htmlFor="email-login">Email address</label>
        <input name="email" type="email" id="email-login" className="form-control login-ctrl" value={this.state.email} placeholder="email" onChange={this.handleInput}/>
      </div>
      <div className="form-group">
        <label className="login-label" htmlFor="password-login">Password</label>
        <input name="password" type="password" id="password-login" className="form-control login-ctrl" value={this.state.password} placeholder="password" onChange={this.handleInput}/>
      </div>
      <button className="btn btn-light login-btn" type="submit">Login</button>
    </form>
    </div>
  );
}
}

export default Login;
