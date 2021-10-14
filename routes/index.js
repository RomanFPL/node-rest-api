const express = require('express');
const router = express.Router();
const notes = require('../repositories')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notes', function(req, res, next) {
  res.json({notes});
});

module.exports = router;
