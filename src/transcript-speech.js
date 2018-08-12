'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'immutable'
import highlight from './highlight'

class SpeechView extends React.Component {
  static propTypes =
    { highlights: PropTypes.instanceOf(List)
    , onClick: PropTypes.func.isRequired
    , progress: PropTypes.string
    , start: PropTypes.number.isRequired
    , text: PropTypes.string.isRequired
    };
  static defaultProps =
    { highlights: List()
    , progress: ''
    };
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.highlights.equals(this.props.highlights) &&
        nextProps.progress === this.props.progress) {
      return false
    } else {
      return true
    }
  }
  handleClick() {
    this.props.onClick(this.props.start)
  }
  applyHighlights() {
    return highlight(this.props.text, this.props.highlights)
      .map(([highlighted, text], index) =>
             highlighted ? <strong key={index}>{text}</strong>
                         : <span key={index}>{text}</span>)
  }
  render() {
    let className = 'speech ' + this.props.progress
    if (this.props.highlights.size > 0) className += ' highlighted'
    return (
      <span
        className={className}
        onClick={this.handleClick}
      >{this.applyHighlights()}</span>
    )
  }
}
export default SpeechView
