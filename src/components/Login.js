import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleLogin}>
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
          <br />
          <input type="submit" name="submit" value="Login" className="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
