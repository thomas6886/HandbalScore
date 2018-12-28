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

module.exports = router;
