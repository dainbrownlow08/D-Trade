import React from "react";
import "./App.css";
import { Alert, Container } from "react-bootstrap";
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
import Orders from "./components/Orders.js";
import Home from './components/Home.js'

import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";

class App extends React.Component {
  state = {
    loggedIn: null,
    wallet: null,
    wrong: false,
  };

  handleLogin = (e, o) => {
    e.preventDefault();
    let username = o.username;
    let password = o.password;
    fetch(`http://localhost:3000/users/${username}-${password}`)
      .then((res) => res.json())
      .then((newWallet) => {
        newWallet === null
          ? this.setState({ wrong: true })
          : this.setState({ loggedIn: true, wallet: newWallet, wrong: false });
      });
  };

  handleRegister = (e, o) => {
    e.preventDefault();
    let username = o.username;
    let password = o.password;
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
          ? this.setState({ wrong: true })
          : this.setState({ loggedIn: true, wallet: newWallet, wrong: false });
      });
  };

  handleLogout = () => {
    this.setState({
      loggedIn: null,
      wallet: null,
    });
  };

  handleWrong = () => {
    this.setState({
      wrong: false,
    });
  };

  componentDidMount() {
    document.body.style.background = "#181818";
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation
            loggedIn={this.state.loggedIn}
            handleLogout={this.handleLogout}
          />
          <br />
          <Switch>
          <Route exact path="/">
              {this.state.loggedIn === true ? (
                <Orders wallet={this.state.wallet} />
              ) : (
                <Redirect to="/home" />
              )}
            </Route>
            <Route exact path="/login">
              {this.state.loggedIn === true ? (
                <Redirect to="/wallet" />
              ) : (
                <Fragment>
                  <Login
                    handleLogin={this.handleLogin}
                    handleWrong={this.handleWrong}
                  />
                  <br />
                  <br />
                  <Container>
                    {this.state.wrong ? (
                      <Alert variant={"danger"}>Invalid Login</Alert>
                    ) : null}
                  </Container>
                </Fragment>
              )}
            </Route>
            <Route exact path="/register">
              {this.state.loggedIn === true ? (
                <Redirect to="/wallet" />
              ) : (
                <Fragment>
                  <Register
                    handleRegister={this.handleRegister}
                    handleWrong={this.handleWrong}
                  />
                  <br />
                  <br />
                  <Container>
                    {this.state.wrong ? (
                      <Alert variant={"danger"}>Invalid Login</Alert>
                    ) : null}
                  </Container>
                </Fragment>
              )}
            </Route>
            <Route exact path="/wallet">
              {this.state.loggedIn === true ? (
                <Wallet wallet={this.state.wallet} />
              ) : (
                <Redirect to="/home" />
              )}
            </Route>
            <Route exact path="/history">
              {this.state.loggedIn === true ? (
                <Orders wallet={this.state.wallet} />
              ) : (
                <Redirect to="/home" />
              )}
            </Route>
            <Route exact path="/home">
             <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
