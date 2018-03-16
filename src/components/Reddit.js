import React from 'react';
import PropTypes from 'prop-types'

export default class Reddit extends React.Component {
  render() {
    return (
      <ul className='reddit-list'>
        {this.props.posts.map(post =>
          <li key={post.id}>
            <a href={post.url} target='_blank' className='reddit-cover'>
              <div className='reddit-cover-info'>
                <strong className='reddit-cover-title'>{post.title}</strong>
                <p className='reddit-cover-domain'>{post.domain}</p>
              </div>
            </a>
          </li>
        )}
      </ul>
    );
  }
};

Reddit.propTypes = {
  posts: PropTypes.array.isRequired
}
