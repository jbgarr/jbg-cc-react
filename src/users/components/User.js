import React from 'react';
import { Link } from 'react-router-dom';

export default ({user}) => {
  return (
    <div className="col-md-4">
      <div className="card user-card">
        <img className="card-img-top" src={user.avatar_url} alt="Card image cap" />
        <div className="card-body">
          <h4 className="card-title">{user.login}</h4>
          <Link to={`/users/${user.login}`} className="btn btn-primary">See Details</Link>
        </div>
      </div>
    </div>
  )
};
