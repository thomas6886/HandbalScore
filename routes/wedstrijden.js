var express = require('express');
var router = express.Router();

/* GET alle wedstrijden. USAGE: url/wedstrijden/wedstrijdenlist*/
router.get('/wedstrijdenlist', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
    res.json(docs);
  });
});

/* GET alle wedstrijden per team. USAGE: url/wedstrijden/wedstrijdenperteam?team=TEAMNAAM*/
router.get('/wedstrijdenperteam', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({$or: [{thuis: req.query.team}, {gasten: req.query.team}]},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
    res.json(docs);
  });
});

/* GET alle wedstrijden per poule. USAGE: url/wedstrijden/wedstrijdenperpoule?poule=POULENAAM*/
router.get('/wedstrijdenperpoule', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({poule: {$regex : ".*"+ req.query.poule + ".*"}},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
    res.json(docs);
  });
});

/* GET alle wedstrijden die nu gespeeld worden*/
router.get('/wedstrijden_nu', function(req, res) {
  //var currTime = new Date("2018-12-29 10:55:00.000");
  var currTime = new Date();
  var db = req.db;
  var collection = db.get('wedstrijden');
  console.log(currTime);
  collection.find({$and: [{begin_tijd: {$lte: currTime}}, {eind_tijd: {$gte: currTime}}]},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
      res.json(docs);
    });

});

/* GET alle wedstrijden die nu straks (+1 uur) worden*/
router.get('/wedstrijden_straks', function(req, res) {
  var timeToCheck = new Date();
  var timeToCheck_plus1 = new Date();
  timeToCheck_plus1.setHours(timeToCheck_plus1.getHours() + 1);
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({begin_tijd: {$gte: timeToCheck, $lte: timeToCheck_plus1}},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
    res.json(docs);
  });
});

router.get('/wedstrijden_admin', function(req, res) {
  var timeToCheck = new Date();
  var timeToCheck_minus1 = new Date();
  timeToCheck_minus1.setHours(timeToCheck_minus1.getHours() - 1);
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({begin_tijd: {$gte: timeToCheck_minus1, $lte: timeToCheck}},{sort : {begin_tijd: -1}},function(e,docs){
    res.json(docs);
  });
});

/* GET alle wedstrijden per dag. USAGE: url/wedstrijden/wedstrijdenperdag?dag=ZATERDAG*/
router.get('/wedstrijdenperdag', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({dag: req.query.dag},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
    res.json(docs);
  });
});



module.exports = router;
