var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET poule page. */
router.get('/poule', function(req, res, next) {
  res.render('poule');
});

/* GET dag page. */
router.get('/dag', function(req, res, next) {
  res.render('dag');
});
module.exports = router;
