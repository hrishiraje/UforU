import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showError: false,
      isLoggedIn: false
    };
  }

  usernameHandler(e) {
    this.setState({
      username: e.target.value
    });
  }

  passwordHandler(e) {
    this.setState({
      password: e.target.value
    });
  }

  submitHandler() {
    console.log('sending ', this.state.username, this.state.password);
    var userData = {
      username: this.state.username,
      password: this.state.password
    };

    axios({
      url: '/signup',
      method: 'POST',
      data: userData,
    })
      .then ((results) => {
        this.setState({isLoggedIn: true});
      })
      .catch ((error) => {
        this.setState({
          showError: true
        });
      });
  }

  render() {

    if (this.state.isLoggedIn) {

      return <Redirect to='/home' />;
    }
    return (
      <div className = "signupContain">
        <p className = "loginText"> Create an account </p>
        <div className="row">
          <div className = "col-md-2 col-md-offset-5">
            <div className = "form-group">
              <input className = "form-control" type = "text" name = "username" placeholder = "Enter Username" onChange={this.usernameHandler.bind(this)}></input>
              <input className = "inputText" type = "text" name = "password" placeholder = "Enter Password" onChange={this.passwordHandler.bind(this)}></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className = "loginButton center-block">
            <button className = "loginButton" type = "submit" onClick = {this.submitHandler.bind(this)}>Signup</button>
          </div>
        </div>
        <div className="row">
          {
            this.state.showError ? <h6 className="text-center"><small>Username is already taken.</small></h6> : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default Signup;