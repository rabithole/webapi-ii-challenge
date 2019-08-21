const express = require('express');

const BlogsRouter = require('./blogs/blogs-router.js');

const server = express();

server.use(express.json()); // Converts data to json... This is middleware...
server.use('/api/posts', BlogsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>API Challeng blogs API</h>
    <p>Welcome to the Lambda blogs API</p>
  `);
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = server;