import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

class SendMessageForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      transcript: '',
    }

    console.log(SpeechRecognition);
    console.log(this.state.text);

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      text: e.target.value,
      transcript: ' '
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.text)

    .then( () => {
      this.setState({
        text: ' ',
      })
      console.log('set state', this.state.text);
    })

    console.log(this.state.text, "this is the state of text");
  }

  componentWillReceiveProps(nextProps){
    console.log('receiving props', nextProps);
    this.setState({
      text: nextProps.transcript,
    });
  }

  render() {

    const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening, listening, finalTranscript, interimTranscript } = this.props
    console.log(transcript);

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div className="text-page">

        <div className="voice">
          <button onClick={() => {startListening;}}>Talk 🎤</button>
          <button onClick={() => {stopListening;}}>Stop 🛑</button>
          <button onClick={resetTranscript}>Reset ↻</button>

        </div>

        <div className="send-message-form">
          <form onSubmit={this.onSubmit}>
            <textarea
              rows="4" cols="50"
              className="text-input"
              type="text"
              placeholder=" Start Typing ✏️...."
              value={this.state.text}
              onChange={this.onChange}
              type="submit"
              >
            </textarea>
            <button type="submit" className="input-button"> Send ✈️ </button>

          </form>
        </div>
      </div>
    )
  }
}

export default SpeechRecognition(SendMessageForm)
