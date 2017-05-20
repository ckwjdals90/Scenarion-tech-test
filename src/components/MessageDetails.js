// view all details of a single message: text, author, created_at, updated_at

import React, { Component } from 'react';

// import './MessageList.css'

class MessageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage(e) {
    e.preventDefault();
    fetch(`https://jungmin-tech-test.herokuapp.com/messages/${this.props.details.id}`, {
      method: 'DELETE'
    })

  }

  render() {
    return(
      <div>
        <p>Author: {this.props.details.author}</p>
        <p>{this.props.details.text}</p>
        <p>posted on {this.props.details.created_at}, last updated on {this.props.details.updated_at}</p>
        <button onClick={this.deleteMessage}>Delete</button>
      </div>
    );
  }
}

export default MessageDetails;
