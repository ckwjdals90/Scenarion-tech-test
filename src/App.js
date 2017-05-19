import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MessageList from './components/MessageList.js';

import 'whatwg-fetch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      messages: []
    }

    this.fetchMessages = this.fetchMessages.bind(this);
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jungmin's Tech Test</h2>
        </div>
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
