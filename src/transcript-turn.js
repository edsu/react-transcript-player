'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Map, List} from 'immutable'
import SpeechView from './transcript-speech'
import functify from './functify'
import {progress} from './utils'

class TurnView extends React.Component {
  static propTypes =
    { highlights: PropTypes.instanceOf(List)
    , index: PropTypes.number.isRequired
    , onMounted: PropTypes.func.isRequired
    , onSpeechClick: PropTypes.func.isRequired
    , progress: PropTypes.string
    , sentences: PropTypes.arrayOf(PropTypes.string).isRequired
    , speaker: PropTypes.string.isRequired
    , speech: PropTypes.arrayOf(PropTypes.shape(
        { text: PropTypes.string
        , start: PropTypes.number
        , end: PropTypes.number
        })).isRequired
    , time: PropTypes.number.isRequired
    };
  static defaultProps =
    { highlights: List()
    , progress: ''
    };
  constructor(props) {
    super(props)
    this.speechRef = React.createRef()
  }
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this)
        , p = el.parentNode
        , bottom = (el) => el.offsetTop + el.offsetHeight
        , displayable = () => bottom(el) < bottom(p)
    var status, end
    if (displayable()) {
      status = 'ok'
      end = this.props.speech.slice(-1)[0].end
    } else {
      let nodes = this.speechRef.current.getElementsByClassName('speech')
        , i = nodes.length - 1
      for (; i >= 0; i--) {
        nodes.item(i).style.display = 'none'
        if (displayable()) {
          break
        }
      }
      if (i > 0) {
        status = 'truncated'
        end = this.props.speech[i - 1].end
      } else {
        status = 'failed'
      }
    }
    this.props.onMounted(status, this.props.index, end)
  }
  render() {
    let highlights = this.props.highlights.reduce((highlights, match) => {
      match.entrySeq().forEach(([speech_idx, range]) => {
        highlights = highlights.update(
          speech_idx, List(), ranges => ranges.push(range))
      })
      return highlights
    }, Map())
    const speechViews = functify(this.props.speech)
      .map(speech => {
        return ([
          <SpeechView
            highlights={highlights.get(speech.index, List())}
            onClick={this.props.onSpeechClick}
            progress={progress(this.props.time, speech.start, speech.end)}
            start={speech.start}
            text={speech.text}
          />
        , ' '
        ])})
       .toArray()
    let className = 'turn ' + this.props.progress + ' p1'
    className += this.props.index % 2 ? ' bg-white' : ' bg-silver'
    return (
      <div
        className={className}
        style={{transition: 'color 0.4s ease'}}
      >
        <span className="bold mr1">{this.props.speaker}</span>
        <div
          className="inline"
          ref={this.speechRef}
        >{speechViews}</div>
      </div>
    )
  }
}
export default TurnView
