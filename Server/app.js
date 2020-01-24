const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
var exec = require('child_process').exec;
var fs = require('fs');
const args = require('minimist')(process.argv.slice(2))




io.on("connection", socket => {
  console.log("New client connected----");

  var noOfLineToRead=args['noOfLineToRead'];

  console.log('!!noOfLineToRead----',!!noOfLineToRead)

  if(!!noOfLineToRead==false){
    noOfLineToRead=10;
  }
    getData(socket,noOfLineToRead);
});

function getData(socket,noOfLine) {
  fs.watch('sample.txt', (curr, prev) => {
    exec('tail -n '+noOfLine+' sample.txt', function (error, stdout, stderr) {
      socket.emit('new message', stdout);
    });
  })
}
server.listen(port, () => console.log(`Listening on port ${port}`));