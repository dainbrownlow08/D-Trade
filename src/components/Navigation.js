import React, { Fragment } from "react";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Navigation(props) {
  return (
    <Fragment>
      <Navbar>
        {!props.loggedIn ? (
          <LinkContainer style={{ color: "gray" }} to="/">
            <Navbar.Brand>D-TRADE</Navbar.Brand>
          </LinkContainer>
        ) : (
          <LinkContainer style={{ color: "gray" }} to="/wallet">
            <Navbar.Brand>D-TRADE</Navbar.Brand>
          </LinkContainer>
        )}
        <Nav className="ml-auto">
          {!props.loggedIn ? (
            <Fragment>
              <LinkContainer style={{ color: "gray" }} to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: "gray" }} to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <Fragment>
              <LinkContainer style={{ color: "gray" }} to="/history">
                <Nav.Link>Trade History</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: "gray" }} to="/">
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
