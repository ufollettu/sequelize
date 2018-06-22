var express = require('express');
var router = express.Router();
var db = require('../models');
// var Article = require('../models/article');

router.post('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  const body = {
    slug: req.body.slug,
    title: req.body.title,
    body: req.body.body,
    timestamp: new Date()
  };
  
  db.articles.create(body, {
    fields: ['slug', 'title','body', 'timestamp'] // whitelist: only set this fields (slug: "")
  })
    .then(() => {
    res.send('articolo creato');
  })
    .catch(err => res.send(err.errors));

  // build and save are the same as create
  // db.articles.build({
  //   slug: slug,
  //   title : title,
  //   body: body
  // }).save()
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
router.get('/:id&:title', async (req, res, next) => {
  const articleId = req.params.id;
  const articleTitle = req.params.title;
  // SELECT `title` FROM `Articles` AS `Articles` 
  // WHERE `Articles`.`slug` = 'titoaee' AND `Articles`.`title` = 'icwsssdoaaaaaa';
  db.articles.findAll({
    attributes: ['timestamp'],
    where: {
      slug: articleId,
      title: articleTitle
    }
  })
  .then(articles => res.json(articles));
  // db.articles.findById(articleId)
  //   .then(article => {
  //     res.json(article)
  //   })
  // res.send('articles route');
});

module.exports = router;
