const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//GET Route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//GET Route wildcard
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
