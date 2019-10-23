import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import classes from './App.module.css';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Layout from './hoc/Layout/Layout';
import * as actions  from './store/actions/index';

const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncGame = AsyncComponent(() => {
  return import('./containers/Game/Game');
});

const asyncRegister = AsyncComponent(() => {
  return import('./containers/Auth/Register/Register');
})

const asyncHomePage = AsyncComponent(() => {
  return import( './components/HomePage/HomePage');
})

const asyncLogout = AsyncComponent(() => {
  return import('./containers/Auth/Logout/Logout')
});

class App extends Component{
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render(){
    let routes = (
      <Switch>
        <Route path="/user/login" component={asyncAuth} />
        <Route path="/user/register" component={asyncRegister} />
        <Route path="/" exact component={asyncHomePage} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/user/logout" component={asyncLogout} />
          <Route path="/game" exact component={asyncGame} />
          <Route path="/" component={asyncHomePage} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
