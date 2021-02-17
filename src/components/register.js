import React from "react";

class Register extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleRegister}>
          <h3>Enter Username</h3>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            className="input-text"
          />
          <h3>Password</h3>
          <input
            type="text"
            name="password"
            placeholder="Password..."
            className="input-text"
          />
          <input
            type="submit"
            name="submit"
            value="Register"
            className="submit"
          />
        </form>
      </div>
    );
  }
}

export default Register;
