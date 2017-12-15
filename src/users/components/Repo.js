import React from 'react';

export default ({repo}) => (
  <div className="repo card">
    <div className="card-body">
      <span className="card-title clearfix">
        <a href={repo.html_url} target="new">{repo.name}</a>
        <span className="small pull-right badge badge-secondary">
          <i className="fa fa-star-o"></i> Stars: {repo.stargazers_count}
        </span>
      </span>
      <hr/>
      <p>{repo.description}</p>
    </div>
  </div>
)
