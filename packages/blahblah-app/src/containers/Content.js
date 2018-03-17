import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Post from '../components/Post'

class Content extends React.Component {
  render() {
    const { reddit, devblog, awesomeblog } = this.props
    return (
      <main className="content">
        <div className="post-container">
          <Post posts={reddit} />
          <Post posts={devblog} />
          <Post posts={awesomeblog} />
        </div>
      </main>
    )
  }
}

Content.propTypes = {
  reddit: PropTypes.array.isRequired,
  devblog: PropTypes.array.isRequired,
  awesomeblog: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    reddit: state.post.reddit,
    devblog: state.post.devblog,
    awesomeblog: state.post.awesomeblog,
  }
}

export default connect(mapStateToProps)(Content)
