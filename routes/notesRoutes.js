const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

//API GET Route
router.get('/', (req, res) => {
  readFromFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading database');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

//POST Route
router.post('/', (req, res) => {
  const { title, text } = req.body
  if (req.body) {
    const newNote = { title, text, note_id:uuidv4() }
    readAndAppend(newNote, './db/db.json', (err,data) => {
        if (err) {
        console.log(err);
        res.status(500).send("Error reading database")
    } else { 
        const notes = JSON.parse(data);
        notes.push(newNote);
        writeToFile("./db/db.json", JSON.stringify(notes), (err) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error writing to database");
            } else {
              res.json(newNote);
            }
          });
        }
      });
    } else {
      res.status(400).send('Bad Request');
    }
  });

    module.exports = router;