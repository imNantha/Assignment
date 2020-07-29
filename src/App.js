import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './App/Login/Login';
import Home from './App/Layout/Home';

function App(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
           {props.login ? <Home /> :
            <React.Fragment>
              <Redirect to='/login' />
              <Route path='/login' component={Login} />
            </React.Fragment>
          }
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  login: state.login.login
});

export default connect(mapStateToProps)(App);