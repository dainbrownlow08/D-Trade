import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleLogin}>
          <h3>Please Enter Username!</h3>
          <input
            type="text"
            name="username"
            placeholder="Username..."
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
