import React from 'react'
import PropTypes from 'prop-types'

export default class Post extends React.Component {
  render() {
    const { posts } = this.props
    return (
      <ul className="post-list">
        {posts.data.map(post => (
          <li key={post.id}>
            <a href={post.link} target="_blank" className="post-cover">
              <div className="post-cover-info">
                <strong className="post-cover-title">{post.title}</strong>
                <p className="post-cover-domain">{post.desc}</p>
                <p className="post-cover-star">{post.author}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    )
  }
}

Post.propTypes = {
  posts: PropTypes.array.isRequired,
}
