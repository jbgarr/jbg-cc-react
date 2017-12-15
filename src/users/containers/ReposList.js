import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import Repo from '../components/Repo';
import { performLoadUserRepos } from '../store/actions';
import { getReposForActiveUser } from '../store/reducers';

class ReposList extends Component {
  componentDidMount = () => {
    const {userLogin, performLoadUserRepos} = this.props;
    performLoadUserRepos(userLogin);
  }

  componentWillReceiveProps = (nextProps) => {
    const nextLogin = nextProps.userLogin;
    const {userLogin, performLoadUserRepos} = this.props;
    if (nextLogin !== userLogin) {
      performLoadUserRepos(nextLogin);
    }
  }

  render() {
    const {repos} = this.props;

    return (
      <div className="repos-list">
        {repos && 
          repos.map(repo => <Repo key={repo.id} repo={repo} />)
        }
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const {userLogin} = ownProps;
    return {
      repos: getReposForActiveUser(state, userLogin)
    }
  },
  {performLoadUserRepos}
)(ReposList);