import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Post from '../components/Post'

class Content extends React.Component {
  render() {
    const { today, week, month } = this.props
    return (
      <main className="content">
        <div className="post-container">
          <Post posts={today} />
          <Post posts={week} />
          <Post posts={month} />
        </div>
      </main>
    )
  }
}

Content.propTypes = {
  today: PropTypes.array.isRequired,
  week: PropTypes.array.isRequired,
  month: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    today: state.post.today,
    week: state.post.week,
    month: state.post.month,
  }
}

export default connect(mapStateToProps)(Content)
