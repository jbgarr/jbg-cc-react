import React, { Component } from 'react';
import { connect } from 'react-redux';

import User from '../components/User';

class UsersList extends Component {
  handleLoadTopUsers = (evt) => {
    this.props.performLoadTopUsers();
  }

  render() {
    const {users} = this.props;

    return (
      <div className="row">
        {users.map(user => {
          return <User key={user.id} user={user}/>
        })}  
      </div> 
    );
  }
}

export default connect(
  (state) => {
    const entities = state.users.entities;
    const users = entities ? entities.ids.map(id => entities.data[id]) : [];
    return {users};
  }
)(UsersList);