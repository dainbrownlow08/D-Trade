import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Navigation(props) {
  return (
    <Fragment>
      <Navbar>
        <LinkContainer style={{color: 'gray'}} to="/">
          <Navbar.Brand>D-TRADE</Navbar.Brand>
        </LinkContainer>
        <Nav>
          {!props.loggedIn ? (
            <Fragment>
              <LinkContainer to="/login">
                <Nav.Link>LOGIN</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>REGISTER</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <LinkContainer style={{color: 'gray'}} to="/">
              <Nav.Link onClick={props.handleLogout}>LOGOUT</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;
