var express = require('express');
var router = express.Router();
var db = require('../models');
// var Article = require('../models/article');

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const body = {
    slug: req.body.slug,
    title: req.body.title,
    body: req.body.body
  };
  
  db.articles.create(body, {
    fields: ['title', 'body'] // whitelist: only set this fields (slug: "")
  })

  // build and save are the same as create
  // db.articles.build({
  //   slug: slug,
  //   title : title,
  //   body: body
  // }).save()

    .then(() => {
    res.send('articolo creato');
  })
    .catch(err => res.send(err.errors));
})

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  db.articles.findAll()
    .then(articles => {
      res.json(articles)
    }).catch(err => res.send(err.errors));
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
