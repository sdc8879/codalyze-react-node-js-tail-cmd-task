
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      response: "",
      endpoint: "http://localhost:4001",
    };
    this.socket = socketIOClient(this.state.endpoint);
  }
  componentDidMount() {
    this.socket.on("new message", data => {
      console.log('data-----------', data)
      this.setState({ response: data })
    })
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        Last 10 Lines Of the file is..
        <br></br>
        <br></br>
        <br></br>
        <h5>{response}</h5>
      </div>

    )
  }
}
export default App;
