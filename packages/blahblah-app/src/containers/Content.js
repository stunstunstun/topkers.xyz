import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Post from '../components/Post'

class Content extends React.Component {
  render() {
    const { devblog, reddit, github } = this.props
    return (
      <main className="content">
        <div className="post-container">
          <Post posts={devblog} />
          <Post posts={reddit} />
          <Post posts={github} />
        </div>
      </main>
    )
  }
}

Content.propTypes = {
  devblog: PropTypes.array.isRequired,
  reddit: PropTypes.array.isRequired,
  github: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    devblog: state.post.devblog,
    reddit: state.post.reddit,
    github: state.post.github,
  }
}

export default connect(mapStateToProps)(Content)
