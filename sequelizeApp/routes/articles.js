var express = require('express');
var router = express.Router();
var db = require('../models');
// var Article = require('../models/article');

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const title = req.body.title;
  const body = req.body.body;

  db.articles.create({
    title : title,
    body: body
  }).then(function() {
    res.send('articolo creato');
  });
})

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  db.articles.findAll()
    .then(articles => {
      res.json(articles)
    })
  // res.send('articles route');
});

module.exports = router;
