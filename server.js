const express = require('express');
const path = require('path');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET Route for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//GET Route wildcard
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//API POST Route
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    // save the new note to your database or data store
    res.json(newNote);
  });

//API GET Route
app.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
//   app.get('/notes', (req, res) => {
//     res.json(notes);
//   });

//   let notes = [];

//   app.post('/notes', (req, res) => {
//     const note = {
//         id: uuid.v4(),
//         title: req.body.title,
//         text: req.body.content
//     }

//     notes.push(note);
//     res.status(201).json(note);
//   })

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
