import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import Community from "./components/Community";
import Search from "./components/Search";
import "./App.css";

import Header from "./components/Header";

import "./App.css";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: !!Cookies.get("Authorization"),
    };

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);

  }


  async handleLogin(e, obj) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(obj),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch("/rest-auth/login/", options).catch(
      handleError
    );
    const data = await response.json().catch(handleError);

    if (data.key) {
      Cookies.set("Authorization", `Token ${data.key}`);
      this.setState({ isLoggedIn: true });
      this.props.history.push("/");
    }
    // this.addMessages = this.addMessages.bind(this);
  }


  async handleRegistration(e, obj) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(obj),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch("/rest-auth/registration/", options).catch(
      handleError
    );
    const data = await response.json().catch(handleError);

    if (data.key) {
      Cookies.set("Authorization", `Token ${data.key}`);
      this.setState({ isLoggedIn: true });
      this.props.history.push("/");
    }
  }


  async handleLogOut(e) {
    e.preventDefault();

    // alert("logging out");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch("/rest-auth/logout/", options).catch(
      handleError
    );

    if (response.ok) {
      Cookies.remove("Authorization");
      this.setState({ isLoggedIn: false });
      this.props.history.push("/login/");
    }
  }


  render() {
    return (
      <React.Fragment>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          handleLogOut={this.handleLogOut}
        />
        <Switch>
          <Route path="/login">
            <Login handleLogin={this.handleLogin} />
          </Route>
          <Route path="/register">
            <Register handleRegistration={this.handleRegistration} />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/community">
            <Community />
          </Route>
          <Route exact path="/">
            <Search
              isLoggedIn={this.state.isLoggedIn}
            />
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
