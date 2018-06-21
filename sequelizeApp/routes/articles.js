var express = require('express');
var router = express.Router();
var db = require('../models');
// var Article = require('../models/article');

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const title = req.body.title;
  const body = req.body.body;
  const slug = req.body.slug;

  db.articles.create({
    slug: slug,
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

/* GET single article. */
router.get('/:id', async (req, res, next) => {
  const articleId = req.params.id;
  db.articles.findById(articleId)
    .then(article => {
      res.json(article)
    })
  // res.send('articles route');
});

module.exports = router;
