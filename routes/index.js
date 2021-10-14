const express = require('express');
const router = express.Router();
const notes = require('../repositories');
const {getStats, generateKey, postScheme, validateId} = require('../helpers');
const Joi = require('joi');


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
  const result = validateId(req.params);
  const curentId = req.params.id

  if (result.error){
    return res.status(400).send(result.error);
  }

  const note = notes.find(raw => raw.id === curentId);

  if(note === undefined){
    return res.status(400).send(`There is no item with id: ${curentId}`);
  }
  res.json({note})
});



router.post('/notes', function(req, res){
    const result = Joi.object(postScheme).validate(req.body);

    if (result.error){
      return res.status(400).send(result.error);
    }
    const note = {
      id: generateKey(),
      name: req.body.name,
      date: req.body.date,
      category: req.body.category,
      content: req.body.content,
      dates: req.body.dates,
      status: req.body.stats
    }

    notes.push(note);
    res.json({note})
})



router.delete('/notes/:id', function(req, res){
  const curentId = req.params.id
  const result = validateId(req.params);

  if (result.error){
    return res.status(400).send(result.error);
  }

  const index = notes.findIndex(elem => elem.id == curentId);

  if(index<0){
    return res.status(400).send(`There is no item with id: ${curentId}`);
  }

  const note = notes.splice(index, 1);
  res.json({ note })
})



router.patch('/notes/:id', function(req, res){
  const curentId = req.params.id;
  const validateID = validateId(req.params);

  if (validateID.error){
    return res.status(400).send(validateID.error);
  }

  const result = Joi.object(postScheme).validate(req.body);

  if (result.error){
    return res.status(400).send(result.error);
  }

  const editNote = {
    id: req.params.id,
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    content: req.body.content,
    dates: req.body.dates,
    status: req.body.stats
  }
  const index = notes.findIndex(elem => elem.id == curentId);

  if(index<0){
    return res.status(400).send(`There is no item with id: ${curentId}`);
  }

  const note = notes.splice(index, 1, editNote);
  res.json({ note })
})

module.exports = router;
