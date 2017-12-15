import React, { Component } from "react";
import PropTypes from "prop-types";

/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PrivateRoute from "../misc/PrivateRoute";
import NotFound from "../misc/NotFound";

import UsersPage from '../../users/containers/UsersPage';
import UserDetailsPage from '../../users/containers/UserDetailsPage';

import { logout } from "../../actions/auth";

import "./app.css";

class App extends Component {
  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
  }

  render() {
    const { user } = this.props;
    const isAuthenticated = true && user;
    return (
      <Router>
        <div>
          <div className="container">
            <Header user={user} handleLogout={() => this.handleLogout()} />
            <div className="appContent">
              <Switch>
                <Route exact path="/" component={UsersPage} />
                <Route path="/users/:login" render={({match}) => (
                  <UserDetailsPage userLogin={match.params.login}/>
                )}/>
                <Route path="/users" component={UsersPage} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null
  };
};

export default connect(mapStateToProps)(App);
