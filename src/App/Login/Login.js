import React, { Component } from 'react';
import { loginAction } from '../../Redux/login.action'
import { connect } from 'react-redux';
import axios from 'axios';
class Login extends Component {

  state = { load: false, errors: {}, error: null, success: null }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ load: true });
    if (this.handleValidation()) {
      const data = {
        "password": this.state.password,
        "username": this.state.uname
      }
      axios.post('http://167.172.242.107:8282/authenticate/', data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "123"
        },
      }).then(res => {
        if (res.status === 200) {
          if (res.data) {
            this.setState({ success: 'Logged', load: false });
            setTimeout(() => {
              this.props.loginAction(res.data)
              this.props.history.push('/assignment');
            }, 2000);
          } else {
            this.setState({ error: 'Failed', load: false });
            setTimeout(() => this.setState({ error: null }), 5000);
          }
        }
      }).catch(error => {
        this.setState({ error: 'Failed', load: false });
        setTimeout(() => this.setState({ error: null }), 5000);
      })
    } else {
      this.setState({ load: false });
    }
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.uname) {
      formIsValid = false;
      errors["uname"] = "Enter Username";
    }

    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "Enter Password";
    }

    this.setState({ errors: errors });
    setTimeout(() => this.setState({ errors: {} }), 2500);
    return formIsValid;
  }

  componentDidMount() {
    document.body.classList.add('login');
  }

  componentWillUnmount() {
    document.body.classList.remove('login');
  }

  render() {
    return (
      <div className="login">
        <div className="login-page">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-5 col-md-8 ">
                <div className="login-form">
                  <img className="logo center" src="/images/Canyon_Logo-revised2.webp" alt='logo' />
                  <div className="signin text-center">Signin</div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input type="text" className="form-control" name="uname" onChange={this.handleChange} placeholder="Username" id="uname" />
                      <span className='formError'>{this.state.errors["uname"] ? this.state.errors["uname"] : null}</span>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" id="pwd" />
                      <span className='formError'>{this.state.errors["password"] ? this.state.errors["password"] : null}</span>
                    </div>
                    <div className="form-group form-check">
                    </div>
                    <button type='submit' className="login-button">{this.state.load ? <i className="fa fa-spinner fa-spin"></i> : null}LOGIN</button>
                  </form>
                  <div className="forgot-pw mt-4"><span>Forgot Password?</span></div>
                </div>
              </div>
            </div>

            {(this.state.error || this.state.success) &&
              <div id="snackbar" className={this.state.error ? "shown danger" : "shown success"}><b> {this.state.error || this.state.success}</b></div>}

            <div className="row ">
              <div className="col-md-12">
                <div className="rights">@2020. All rights reserved. Powered with canyontechnologies.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loginAction: (login) => dispatch(loginAction(login)),
});

export default connect(null, mapDispatchToProps)(Login);