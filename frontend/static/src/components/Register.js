import React, { Component } from 'react';

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: ''
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

render(){
  return(
    <div class='reg_out'>
    <form  className="regform mt-4 py-5" onSubmit={(e) => this.props.handleRegistration(e, this.state)}>
    <div className="form-group">
      <label className="login-label" htmlFor="username">Username</label>
      <input className="form-control login-ctrl" id="username" type="text" name="username" value={this.state.username} placeholder="username" onChange={this.handleInput}/>
    </div>
    <div className="form-group">
      <label className="login-label" htmlFor="email">Email address</label>
      <input className="form-control login-ctrl" id="email" type="email" name="email" value={this.state.email} placeholder="email" onChange={this.handleInput}/>
    </div>
    <div className="form-group">
      <label className="login-label" htmlFor="password1">Password</label>
      <input className="form-control login-ctrl" id="password1" type="password" name="password1" value={this.state.password1} placeholder="password" onChange={this.handleInput}/>
    </div>
    <div className="form-group">
      <label className="login-label" htmlFor="password2">Confirm Password</label>
      <input className="form-control login-ctrl" id="password2" type="password" name="password2" value={this.state.password2} placeholder="confirm password" onChange={this.handleInput}/>
    </div>
      <button className="btn btn-light reggie-btn" type="submit">Register</button>
    </form>
    </div>
  );
}

}

export default Register;
