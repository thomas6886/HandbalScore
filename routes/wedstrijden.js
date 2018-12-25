var express = require('express');
var router = express.Router();

//Authentication
var auth = require('http-auth');
var basic = auth.basic({
      realm: "Protected Area"
    }, function (username, password, callback) { // Custom authentication method.
      callback(username === "test" && password === "test");
    }
);

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

/* GET alle wedstrijden die nu gespeeld worden*/
router.get('/wedstrijden_nu', function(req, res) {
  //var currTime = new Date("2018-12-29 10:55:00.000");
  var currTime = new Date("2018-12-29T14:57:15.967Z");
  var db = req.db;
  var collection = db.get('wedstrijden');
  console.log(currTime);
  collection.find({$and: [{begin_tijd: {$lte: currTime}}, {eind_tijd: {$gte: currTime}}]},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
      res.json(docs);
    });

});

/* GET alle wedstrijden die nu straks (+1 uur) worden*/
router.get('/wedstrijden_straks', function(req, res) {
  var timeToCheck = new Date("2018-12-29T14:57:15.967Z");
  var timeToCheck_plus1 = new Date("2018-12-29T14:57:15.967Z");
  timeToCheck_plus1.setHours(timeToCheck_plus1.getHours() + 1);
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({begin_tijd: {$gte: timeToCheck, $lte: timeToCheck_plus1}},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
    res.json(docs);
  });
});

/* GET alle wedstrijden die aan de admin vertoond moeten worden (nu gespeeld tot een uur geleden)*/
router.get('/wedstrijden_admin', function(req, res) {
  var timeToCheck = new Date("2018-12-29T14:57:15.967Z");
  var timeToCheck_minus1 = new Date("2018-12-29T14:57:15.967Z");
  timeToCheck_minus1.setHours(timeToCheck_minus1.getHours() - 1);
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({begin_tijd: {$gte: timeToCheck_minus1, $lte: timeToCheck}},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
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


/*PUT nieuwe score wedstrijd per wedstrijdID. USAGE: url/wedstrijden/updatescore?wedstrijd=WEDSTRIJD&team=punten_thuis&increment=1*/
//router.put('/updatescore', auth.connect(basic),function (req, res) {
router.put('/updatescore', function (req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  //req.connection.remoteAdd

  if(req.query.team == 'punten_thuis'){
    console.log("THUIS");
    collection.findOneAndUpdate({wedstrijd_id : parseInt(req.query.wedstrijd)}, {$inc: {punten_thuis : parseInt(req.query.increment)}},
        function(err){
          if(err) throw err;
            res.send('PUT request to the homepage');
        });
  }else{
    collection.findOneAndUpdate({wedstrijd_id : parseInt(req.query.wedstrijd)}, {$inc: {punten_gasten : parseInt(req.query.increment)}},
        function(err) {
          if (err) throw err;
          res.send('PUT request to the homepage');

        });
  }

});

module.exports = router;
