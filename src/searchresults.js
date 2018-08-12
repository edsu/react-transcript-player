'use strict'

import React from 'react'
import PropTypes from 'prop-types'

class SearchResults extends React.Component {
  static propTypes =
    { count: PropTypes.number.isRequired
    , onNavigateResult: PropTypes.func.isRequired
    };
  constructor(props) {
    super(props)
    this.handleBackwardClick = this.handleBackwardClick.bind(this)
    this.handleForwardClick = this.handleForwardClick.bind(this)
  }
  handleBackwardClick() {
    this.props.onNavigateResult('backward')
  }
  handleForwardClick() {
    this.props.onNavigateResult('forward')
  }
  render() {
    return (
      <div className="col col-4 flex flex-center">
        {this.props.count}&nbsp;matches
        <div className="inline-block border rounded ml1">
          <button
            className="left btn border-right"
            onClick={this.handleBackwardClick}
          >
            <i className="fa fa-chevron-left" />
          </button>
          <button
            className="right btn"
            onClick={this.handleForwardClick}
          >
            <i className="fa fa-chevron-right" />
          </button>
        </div>
      </div>
    )
  }
}
export default SearchResults
