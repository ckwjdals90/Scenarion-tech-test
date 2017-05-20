import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MessageList from './components/MessageList.js';
import CreateMessage from './components/CreateMessage.js';

import 'whatwg-fetch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fetchFrom: 'https://jungmin-tech-test.herokuapp.com/messages/',
      data: {},
      messages: [],
      toggle: false
    }

    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.viewCreate = this.viewCreate.bind(this);
    // this.clearMessages = this.clearMessages.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }


  // clearMessages() {
  //   this.setState({
  //     messages: []
  //   })
  // }

  fetchMessages() {
    let msgAry = this.state.messages
    fetch(this.state.fetchFrom)
      .then((res) => {
        return res.json();
      }).then((body) => {
        msgAry = msgAry.concat(body.results)
        this.setState({
          data: body,
          messages: msgAry
        })
        return body;
      })
      .then((body) => {
        if (body.next && body.next !== null) {
        this.setState({
          fetchFrom: body.next
        })
        this.fetchMessages();
        } else {
          this.setState({
            fetchFrom: 'https://jungmin-tech-test.herokuapp.com/messages/'
          })
          return;
        }
      })
  }

  handleToggle(e) {
    if (e) {e.preventDefault();}
    (this.state.toggle === true) ? this.setState({toggle: false}) : this.setState({toggle: true})
  }

  viewCreate() {
    if (this.state.toggle === true) {
      return <CreateMessage fetchMessages={this.fetchMessages} currentMessageCount={this.state.data.count} handleToggle={this.handleToggle} /* clearMessages={this.clearMessages} */ />
    } else {
      return;
    }
  }

  render() {

    const mapMsg = (messages) => {
      messages.map((message, i) => {
        <MessageList key={i} message={message} fetchMessages={this.fetchMessages} />
      })
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jungmin's Tech Test</h2>
        </div>
        <a href="#" onClick={this.handleToggle}>Create New Message</a>
        {this.viewCreate()}
        <ul>
          {this.state.messages.map((message, i) => {
            return <MessageList key={i} message={message} fetchMessages={this.fetchMessages} />
          })}
        </ul>
      </div>
    );
  }
}

export default App;
