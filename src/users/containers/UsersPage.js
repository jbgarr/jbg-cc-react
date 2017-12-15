import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserSearch from './UserSearch';
import UsersList from './UsersList';
import { performLoadTopUsers } from '../store/actions';

class UsersPage extends Component {
  handleLoadTopUsers = (evt) => {
    this.props.performLoadTopUsers();
  }

  render() {
    const {loading, loaded} = this.props;

    return (
      <div className="container users-page">
        <div className="row">
          <div className="col-md-5">
            <div className="padded-top">
              <UserSearch />
              <p>Can't think of anyone to search for? Try searching for yourself.</p>
            </div>
          </div>
          <div className="col-md-2 text-center or">
            <div className="or-Wrap">
              <div className="or">
                <span className="rounded-circle">OR</span>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="padded-top">
              <p>Click the button below to get the top 10 followed users on GitHub</p>
              <button className="btn btn-sm btn-outline-primary" onClick={this.handleLoadTopUsers}>Help Me Search</button>
            </div>
          </div>
        </div>
        {(!loading && loaded) && 
          <UsersList />
        }
      </div>
    );
  }
}

export default connect(
  (state) => state.users,
  {performLoadTopUsers}
)(UsersPage);