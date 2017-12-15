import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import ReposList from './ReposList';
import { performLoadUserDetails } from '../store/actions';
import { getActiveUserDetails, getUserLoginById } from '../store/reducers';

class UserDetailsPage extends Component {
  componentDidMount = () => {
    const {userLogin, performLoadUserDetails} = this.props;
    performLoadUserDetails(userLogin);
  }

  componentWillReceiveProps = (nextProps) => {
    const nextLogin = nextProps.userLogin;
    const {userLogin, performLoadUserDetails} = this.props;
    if (nextLogin !== userLogin) {
      performLoadUserDetails(nextLogin);
    }
  }

  render() {
    const {user, loading, loaded, error} = this.props;

    const content = (
      <div>
        {(loaded && error) &&
          <div className="alert alert-danger" role="alert">
            Whoops! Something went wrong: {error}
          </div>
        }
        {(loaded && !error && user.id) && 
          <div className="row">
            <div className="col-md-4">
              <div className="card user-card">
                <div className="avatar-Backgroud"></div>
                <div className="card-body"> 
                  <div className="text-center">
                    <img className="avatar rounded-circle" style={{maxWidth: ''}} src={user.avatar_url} alt={`${user.login} Avatar`}/>
                    <h3>{user.login}</h3>
                    <p>{user.name}</p>
                  </div>
                </div>
              </div>
              <div className="card stats-card">
                <div className="card-body"> 
                  <div className="stats">
                    <p>
                      <b>Followers:</b> <span>{user.followers}</span>
                    </p>
                    <p>
                      <b>Following:</b> <span>{user.following}</span>
                    </p>
                    <p>
                      <b>Repos:</b> <span>{user.public_repos}</span>
                    </p>
                    <hr/>
                    {user.location && 
                      <p>
                        <b>Location: {user.location}</b>
                      </p>
                    } 
                    {user.company && 
                      <p>
                        <b>Company: {user.company}</b>
                      </p>
                    } 
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <nav className="nav nav-tabs" id="myTab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-repos-tab" data-toggle="tab" href="#nav-repos" role="tab" aria-controls="nav-repos" aria-selected="true">Repos</a>
                    <a className="nav-item nav-link" id="nav-followers-tab" data-toggle="tab" href="#nav-followers" role="tab" aria-controls="nav-followers" aria-selected="false">Followers</a>
                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-repos" role="tabpanel" aria-labelledby="nav-repos-tab">
                      <ReposList userLogin={user.login} />
                    </div>
                    <div className="tab-pane fade" id="nav-followers" role="tabpanel" aria-labelledby="nav-followers-tab">
                      Followers
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                      Contact
                    </div>
                  </div>
                </div>
              </div>        
            </div>
          </div>
        }
      </div>
    );

    return (
      <div className="container">
        {loading && 
          <Loader />
        }
        {!loading && 
          content
        }
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const {userLogin} = ownProps;
    return {
      ...state.userDetails,
      user: getActiveUserDetails(state.users, userLogin)
    }
  },
  {performLoadUserDetails}
)(UserDetailsPage);