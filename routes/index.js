const express = require('express');
const router = express.Router();
const notes = require('../repositories');
const getStats = require('../helpers/calckSum');
const generateKey = require('../helpers/randomKey');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notes', function(req, res) {
  res.json({notes});
});

router.get('/notes/stats', function(req, res) {
  const stats = getStats(notes)
  res.json({stats})
});

router.get('/notes/:id', function(req, res) {
  const note = notes.find(raw => raw.id === req.params.id);
  res.json({note})
});

router.post('/notes', function(req, res){
    const newNote = {
      id: generateKey(),
      name: req.body.name,
      date: req.body.date,
      category: req.body.category,
      content: req.body.content,
      dates: req.body.dates,
      status: req.body.stats
    }
    notes.push(newNote);
    res.json({notes})
})

router.delete('/notes/:Id', function(req, res){
  const index = notes.findIndex(elem => elem.id == req.params.Id);
  const note = notes.splice(index, 1);
  res.json({ note })
})

router.patch('/notes/:Id', function(req, res){
  const editNote = {
    id: req.params.Id,
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    content: req.body.content,
    dates: req.body.dates,
    status: req.body.stats
  }
  const index = notes.findIndex(elem => elem.id == req.params.Id);
  const note = notes.splice(index, 1, editNote);
  res.json({ note })
})

module.exports = router;
