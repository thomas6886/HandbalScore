var express = require('express');
var router = express.Router();

//Authentication
var auth = require('http-auth');
var basic = auth.basic({
      realm: "Protected Area"
    }, function (username, password, callback) { // Custom authentication method.
      callback(username === "handbaldalfsen" && password === "ibwsuyk2");
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

/* GET alle wedstrijden per dag. USAGE: url/wedstrijden/wedstrijdenperdag?dag=ZATERDAG*/
router.get('/wedstrijdenperdag', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({dag: req.query.dag},{"sort" : ['begin_tijd', 'asc']},function(e,docs){
    res.json(docs);
  });
});


/*PUT nieuwe score wedstrijd per wedstrijdID. USAGE: url/wedstrijden/updatescore?wedstrijd=WEDSTRIJD&team=punten_thuis&increment=1*/
router.put('/updatescore', auth.connect(basic),function (req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');

  if(req.query.team == 'punten_thuis'){
    console.log("THUIS");
    collection.findOneAndUpdate(
        {wedstrijd_id : req.query.wedstrijd},
        {$inc: {punten_thuis : 1}},
        function(err){
          if(err) throw err;
            res.send('PUT request to the homepage');
        });
  }else{
    console.log("Wedstrijd: " + req.query.wedstrijd + " ; Team: "+ req.query.team);
    collection.findOneAndUpdate(
        {wedstrijd_id : req.query.wedstrijd},
        {$inc: {punten_gasten : 1}},
        function(err){
          if(err) throw err;
          res.send('PUT request to the homepage');
        });
  }

});

module.exports = router;
