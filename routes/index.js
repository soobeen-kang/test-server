var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('movie', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.get('/mymovie', function(req, res, next) {
  res.render('mymovie', { title: 'Express' });
});

router.get('/myhtml', function(req, res, next) {
  res.render('myhtml', { title: 'Express' });
});

router.get('/myreview', function(req, res, next) {
  res.render('page2', { title: 'Express' });
});

router.get('/review', function(req, res, next) {
  res.render('review', { title: 'Express' });
});

router.get('/moviepage', function(req, res, next) {
  res.render('moviepage', { title: 'Express' });
});


module.exports = router;
