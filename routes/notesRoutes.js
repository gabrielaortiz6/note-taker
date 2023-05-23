const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

//API GET Route
router.get('/', (req, res) => {
  readFromFile('./db/db.json', 'utf8', (err, data) => {
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
    const newNote = req.body;
    // newNote.id = uuidv4();
    readFromFile('./db/db.json', (err,data) => {
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
    });

    module.exports = router;