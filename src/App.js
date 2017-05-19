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
      data: {},
      messages: [],
      toggle: false
    }

    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.viewCreate = this.viewCreate.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    fetch('https://jungmin-tech-test.herokuapp.com/messages/')
      .then((res) => {
        return res.json();
      }).then((body) => {
        this.setState({
          data: body,
          messages: body.results
        });
      })
  }

  handleToggle(e) {
    e.preventDefault();
    (this.state.toggle === true) ? this.setState({toggle: false}) : this.setState({toggle: true})
  }

  viewCreate() {
    if (this.state.toggle === true) {
      return <CreateMessage fetchMessages={this.fetchMessages} currentMessageCount={this.state.data.count} />
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jungmin's Tech Test</h2>
        </div>
        <a href="#" onClick={this.handleToggle}>Create New Message</a>
        {this.viewCreate()}
        <ul>
          {this.state.messages.map((message) => {
            return <MessageList key={message.id} message={message} />
          })}
        </ul>
      </div>
    );
  }
}

export default App;
