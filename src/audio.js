'use strict'

import React from 'react'
import PropTypes from 'prop-types'

class AudioPlayer extends React.Component {
  static propTypes =
    { media: PropTypes.string.isRequired
    , onEnded: PropTypes.func.isRequired
    , onPause: PropTypes.func.isRequired
    , onPlaying: PropTypes.func.isRequired
    , onTimeUpdate: PropTypes.func.isRequired
    , play: PropTypes.bool
    , seekTime: PropTypes.number
    };
  static defaultProps = {play: false, seekTime: null};
  constructor(props) {
    super(props)
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handlePlaying = this.handlePlaying.bind(this)
    this.handleEnded = this.handleEnded.bind(this)
    this.audioRef = React.createRef()
  }
  componentDidMount() {
    this.seek()
  }
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.media !== this.props.media ||
      nextProps.play !== this.props.play ||
      nextProps.seekTime !== this.props.seekTime
    )
  }
  componentDidUpdate() {
    this.seek()
  }
  handleTimeUpdate() {
    this.props.onTimeUpdate(this.audioRef.current.currentTime)
  }
  handlePause() {
    this.props.onPause()
  }
  handlePlaying() {
    this.props.onPlaying()
  }
  handleEnded() {
    this.props.onEnded()
  }
  seek() {
    if (this.props.seekTime !== null) {
      this.audioRef.current.currentTime = this.props.seekTime
    }
    if (this.props.play) {
      if (this.audioRef.current.paused) {
        this.audioRef.current.play()
      }
    } else {
      if (! (this.audioRef.current.paused || this.audioRef.current.ended)) {
        this.audioRef.current.pause()
      }
    }
  }
  render() {
    return (
      <div>
        <audio
          controls
          onCanPlay={this.handleCanPlay}
          onEnded={this.handleEnded}
          onPause={this.handlePause}
          onPlaying={this.handlePlaying}
          onTimeUpdate={this.handleTimeUpdate}
          ref={this.audioRef}
          src={this.props.media}
          style={{width: '100%'}}
        />
      </div>
    )
  }
}
export default AudioPlayer
