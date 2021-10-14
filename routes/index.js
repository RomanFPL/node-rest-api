const express = require('express');
const router = express.Router();
const notes = require('../repositories')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notes', function(req, res) {
  res.json({notes});
});

router.get('/notes/:id', function(req, res) {
  const note = notes.find(raw => raw.id === req.params.id);
  res.json({note})
});


module.exports = router;
