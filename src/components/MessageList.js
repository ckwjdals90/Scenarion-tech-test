// view a list of messages, displaying the message text and the date the message was posted

import React, { Component } from 'react';

import MessageDetails from './MessageDetails.js';
import './MessageList.css'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: Date(this.props.message.created_at),
      details: {},
      show: false
    }
    this.fetchDetails = this.fetchDetails.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  fetchDetails(e) {
    e.preventDefault();
    fetch(`https://jungmin-tech-test.herokuapp.com/messages/${this.props.message.id}`)
      .then((res) => {
        return res.json();
      }).then((body) => {
        this.setState({
          details: body
        })
      }).then(
        (this.state.show === true) ? this.setState({show: false}) : this.setState({show: true})
      )
  }

  renderDetails() {
    if (this.state.show === true) {
      return <MessageDetails details={this.state.details} fetchMessages={this.props.fetchMessages} /*clearMessages={this.props.clearMessages}*/ />
    } else {
      return
    }
  }

  render() {
    return(
      <li className="message-lists">
        <a href="#" onClick={this.fetchDetails}>message: {this.props.message.text}<br/>posted on {this.state.newDate}</a>
        {this.renderDetails()}
      </li>
    );
  }
}

export default MessageList;
