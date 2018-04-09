import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4001",
      color: 'white',
      time: new Date()
    };
  }
  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    this.setState({
      color: 'yellow'
    })
    socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }
  // adding the function
  setColor = (color) => {
    console.log(color);
    this.setState({
      color
    })
  }
  render() {
    // testing for socket connections
    const socket = socketIOClient(this.state.endpoint);
    socket.on('datetime', (col) => {
      this.setState({
        time: new Date()
      })
    })
    socket.on('news_by_server', function(data) {
      console.log(data);
    });
    return (
      <div style={{
        backgroundColor: this.state.color,
        textAlign: 'center'
      }}>
        <button onClick={() => this.send() }>Change Color</button>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
        <p>
        <code>{this.state.time.toString()}</code></p>
      </div>
    )
  }
}
export default App;