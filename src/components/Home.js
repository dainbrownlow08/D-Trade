import React from "react";
import { Container, Row } from "react-bootstrap";
import logo from "../img/logo.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <br />
          <br />
          <br />
          <Row style={{ justifyContent: "center" }}>
            <img style={{ width: 854, height: 175 }} src={logo}></img>
          </Row>
          <br />
          <br />
          <div>
            <Row style={{ justifyContent: "center" }}>
              <h4 className="center">
                D-Trade is a react web application where people new to
                cryptocurrency can trade safely in a real market environment,
                without risking their capital.
              </h4>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <h4 className="center">
                In an ever evolving world, retail investors now have the
                resources to level the playing field with large financial
                institutions, creating opportunities across all financial
                markets.
              </h4>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <h4 className="center">
                Our goal was to create a succinct, clean, and enjoyable trading
                experience where new strategies can be established, and learning
                can be quantified.
              </h4>
            </Row>
          </div>
          <br />
          <br />
        </Container>
        <footer
          style={{
            color: "#a9a9a9",
            position: "absolute",
            bottom: "0",
            height: "2.5rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "lighter",
          }}
        >
          Created By: Dain Brownlow and Dustin Rothschild
        </footer>
      </div>
    );
  }
}

export default Home;
