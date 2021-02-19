import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Navigation(props) {
  return (
    <Fragment>
      <Navbar style={{ backgroundColor: "#212833" }}>
        {!props.loggedIn ? (
          <LinkContainer style={{ color: "#C0C0C0" }} to="/home">
            <Navbar.Brand>D-TRADE</Navbar.Brand>
          </LinkContainer>
        ) : (
          <LinkContainer style={{ color: "#C0C0C0" }} to="/wallet">
            <Navbar.Brand>D-TRADE</Navbar.Brand>
          </LinkContainer>
        )}
        <Nav className="ml-auto">
          {!props.loggedIn ? (
            <Fragment>
              <br />
              <LinkContainer style={{ color: "#C0C0C0" }} to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: "#C0C0C0" }} to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <Fragment>
              <LinkContainer style={{ color: "#C0C0C0" }} to="/history">
                <Nav.Link>Trade History</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: "#C0C0C0" }} to="/home">
                <Nav.Link onClick={props.handleLogout}>Log Out</Nav.Link>
              </LinkContainer>
            </Fragment>
          )}
        </Nav>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;
