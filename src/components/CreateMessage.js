// allow posting a new message
// id, text, author, in_reply_to, utc_offset, created_at, updated_at
import React, { Component } from 'react';

import './CreateMessage.css'
class CreateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentMessageCount+1,
      text: "",
      author: "",
      in_reply_to: null,
      utc_offset: -700,
      created_at: Date(),
      updated_at: Date()

    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(e) {
    let key = e.target.name;
    let obj = {}
    obj[key] = e.target.value;
    this.setState(obj);
  }

  submitMessage(e) {
    e.preventDefault()
    fetch('https://jungmin-tech-test.herokuapp.com/messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    console.log("submit state: ", this.state);
    console.log("Submit!");
    this.props.clearMessages();
    this.props.fetchMessages();
    this.props.handleToggle();
  }

  render() {
    return(
      <div>
        <form>
          <input onChange={this.handleChange} type="text" name="author" placeholder="Author's name" /><br/>
          <input onChange={this.handleChange} type="textarea" name="text" className="message" placeholder="Please enter the new message." /><br/>
          <button onClick={this.submitMessage} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateMessage;
