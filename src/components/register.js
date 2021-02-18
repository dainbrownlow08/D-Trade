import React from "react";
import { Form, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
  };

  onUsernameChange = (e) => {
    if (e.target.value) {
      this.setState({
        username: e.target.value,
      });
    } else {
      this.setState({
        username: "",
      });
    }
  };

  onPasswordChange = (e) => {
    if (e.target.value) {
      this.setState({
        password: e.target.value,
      });
    } else {
      this.setState({
        password: "",
      });
    }
  };

  createLogin = () => {
    return {
      username: this.state.username,
      password: this.state.password,
    };
  };

  componentDidMount() {
    this.props.handleWrong();
  }

  render() {
    return (
      <div>
        <Container>
          <Form
            onSubmit={(e) => {
              this.props.handleRegister(e, this.createLogin());
            }}
          >
            <Form.Label style={{ color: "#C0C0C0" }}>
              Enter New Username
            </Form.Label>
            <Form.Control
              onChange={(e) => this.onUsernameChange(e)}
              type="string"
              placeholder="Username..."
              style={{
                backgroundColor: "#181818",
                borderColor: "#333333",
                color: "#C0C0C0",
              }}
            />
            <br />
            <Form.Label style={{ color: "#C0C0C0" }}>Password</Form.Label>
            <Form.Control
              onChange={(e) => this.onPasswordChange(e)}
              type="string"
              placeholder="Password..."
              style={{
                backgroundColor: "#181818",
                borderColor: "#333333",
                color: "#C0C0C0",
              }}
            />
            <br />
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
