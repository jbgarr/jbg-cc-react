import React, { Component } from 'react';
import {connect} from 'react-redux';

import {updateUserSearchValue, performSearchForUser} from '../store/actions';
import {getCurrentSearchTerm} from '../store/reducers';

class UserSearch extends Component {
  handleInputChange = (evt) => {
    const val = evt.target.value;
    this.props.updateUserSearchValue(val);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.performSearchForUser();
  }

  render() {
    const {currentSearchTerm} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" type="text" 
            placeholder="GitHub Login"
            onChange={this.handleInputChange}
            value={currentSearchTerm}/>
          <small className="form-text text-muted">Search by GitHub login.</small>
        </div>
      </form>
    );
  }
}

export default connect(
  (state) => ({currentSearchTerm: getCurrentSearchTerm(state.users)}),
  {updateUserSearchValue, performSearchForUser}
)(UserSearch);