import React from 'react';

class Register extends React.Component {

  render() {
    return (
      <div >
        <form  onSubmit={this.props.handleRegister}>
          <h3>Please Enter Your Desired Username!</h3>
          <input type="text" name="username" placeholder="Username..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Register" className="submit"/>
        </form>
      </div>
    );
  }

}

export default Register;