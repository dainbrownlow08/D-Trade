import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Navigation from "./components/Navigation.js";
import Login from "./components/Login.js";
import Register from "./components/register.js";
import Wallet from "./components/wallet.js";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = {
    loggedIn: null,
    wallet: null,
  };

  handleLogin = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    fetch(`http://localhost:3000/users/${username}-${password}`)
      .then((res) => res.json())
      .then((newWallet) => {
        newWallet === null
          ? console.log("INVALID LOGIN")
          : this.setState({ loggedIn: true, wallet: newWallet });
      });
  };

  handleRegister = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let data = { username: username, password: password };
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((newWallet) => {
        newWallet === null
          ? console.log("INVALID LOGIN")
          : this.setState({ loggedIn: true, wallet: newWallet });
      });
  };

  handleLogout = () => {
    this.setState({
      loggedIn: null,
      wallet: null,
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Navigation
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route exact path="/login">
              {this.state.loggedIn === true ? (
                <Redirect to="/wallet" />
              ) : (
                <Login handleLogin={this.handleLogin} />
              )}
            </Route>
            <Route exact path="/register">
              {this.state.loggedIn === true ? (
                <Redirect to="/wallet" />
              ) : (
                <Register handleRegister={this.handleRegister} />
              )}
            </Route>
            <Route exact path="/wallet">
              {this.state.loggedIn === true ? (
                <Wallet wallet={this.state.wallet} />
              ) : (
                <Redirect to="/home" />
              )}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
