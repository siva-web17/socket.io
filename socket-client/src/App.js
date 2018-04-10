import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Highlight from 'react-highlight'
import 'highlight.js/styles/monokai.css';
const socket = socketIOClient('http://localhost:4001');

class App extends Component {
  constructor() {
    super();
    this.socket = socket;
    this.state = {
      color: 'white',
      time: new Date(),
      console: []
    };
  }
  componentWillMount() {
    var that = this;
    socket.on('news_by_server', function(data) {
      that.setState({
        time: data.toString()
      })
      console.log(that.state.console)
      that.state.console.push(that.state.time.toString())
      that.setState(
        that.state
      )
    });
  }
  // sending sockets
  send = () => {
    this.setState({
      color: 'yellow'
    })
    socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }
  // adding the function
  setColor = (color) => {
   // console.log(color);
    this.setState({
      color
    })
  }
  render() {
    const listItems = this.state.console.map((number,i) =>
        <li key={i}>{number}</li>
    );
    return (
      <div style={{
        backgroundColor: this.state.color,
        textAlign: 'center'
      }}>
        <button onClick={() => this.send() }>Change Color</button>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
        <p><code>{this.state.time.toString()}</code></p>

        <Highlight className='LLVM IR'>
            {this.state.time.toString()}
        </Highlight>

      </div>
    )
  }
}
export default App;