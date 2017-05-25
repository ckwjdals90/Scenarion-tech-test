import React, { Component } from 'react';
import update from 'react-addons-update';
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
      messages: [],
      toggle: false
    }

    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.viewCreate = this.viewCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }


  clearMessages() {
    this.setState({
      messages: []
    })
  }

  fetchMessages() {
    console.log(this.state.fetchFrom)
    fetch(this.state.fetchFrom)
    .then((res) => {
      return res.json();
    }).then((body) => {
      if (body.previous === null) {
        this.setState({
          messages: body.results
        })
      } else {
        this.setState({
          messages: this.state.messages.concat(body.results)
        })
      }
      return body;
    }).then((body) => {
      if (body.next && body.next !== null) {
        this.setState({
          fetchFrom: body.next
        })
        this.fetchMessages();
      } else {
        this.setState({
          fetchFrom: 'https://jungmin-tech-test.herokuapp.com/messages/',
        })
        return;
      }
    })
  }

  handleToggle(e) {
    if (e) {e.preventDefault();}
    (this.state.toggle === true) ? this.setState({toggle: false}) : this.setState({toggle: true})
  }

  handleDelete(msgid, msgkey) {
    console.log(msgkey);
    this.setState({
      messages: update(this.state.messages,
        { $splice: [[msgkey, 1]] }
      )
    })
    console.log(this.state.messages);
    fetch(`https://jungmin-tech-test.herokuapp.com/messages/${msgid}`, {
      method: 'DELETE'
    })
  }

  viewCreate() {
    if (this.state.toggle === true) {
      return (<CreateMessage fetchMessages={this.fetchMessages}
                handleToggle={this.handleToggle}/>);
    } else {
      return;
    }
  }

  render() {

    const mapMsg = (messages) => {
      return messages.map((message, i) => {
        return (<MessageList key={i} msgkey={i}
                  message={message}
                  fetchMessages={this.fetchMessages} clearMessages={this.clearMessages}  handleDelete={this.handleDelete} />);
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
          {mapMsg(this.state.messages)}
        </ul>
      </div>
    );
  }
}

export default App;
