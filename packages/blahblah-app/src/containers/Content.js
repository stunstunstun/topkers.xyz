import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Reddit from '../components/Reddit'

class Content extends React.Component {
  render() {
    const { today, week, month } = this.props
    return (
      <main className="content">
        <div className="reddit-container">
          <Reddit posts={today} />
          <Reddit posts={week} />
          <Reddit posts={month} />
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
    today: state.reddit.today,
    week: state.reddit.week,
    month: state.reddit.month,
  }
}

export default connect(mapStateToProps)(Content)
