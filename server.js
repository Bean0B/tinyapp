// //imprort http module
// var http = require('http');
// //handle sending requests and returning responses
// function handleRequests(req, res) {
// //return string
// res.end('hello world');
// }

// //create the server
// var server = http.createServer(handleRequests);
// //start server and listen on port x
// server.listen(8080, function() {
//   console.log('listening on port 8080')
// });

///////////express///////////

const express = require('express');
const app = express();
const port = 8080;
//route our app
const router = require('./app/routes');
app.use('/', router);

//start the server
app.listen(port, function() {
  console.log('app started');
});




