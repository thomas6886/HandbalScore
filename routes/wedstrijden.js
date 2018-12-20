var express = require('express');
var router = express.Router();

/* GET alle wedstrijden. USAGE: url/wedstrijden/wedstrijdenlist*/
router.get('/wedstrijdenlist', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* GET alle wedstrijden per team. USAGE: url/wedstrijden/wedstrijdenperteam?team=TEAMNAAM*/
router.get('/wedstrijdenperteam', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({$or: [{thuis: req.query.team}, {gasten: req.query.team}]},{},function(e,docs){
    res.json(docs);
  });
});

/* GET alle wedstrijden per dag. USAGE: url/wedstrijden/wedstrijdenperdag?dag=ZATERDAG*/
router.get('/wedstrijdenperdag', function(req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');
  collection.find({dag: req.query.dag},{},function(e,docs){
    res.json(docs);
  });
});


/*PUT nieuwe score wedstrijd per wedstrijdID. USAGE: url/wedstrijden/updatescore?wedstrijd=WEDSTRIJD&team=punten_thuis&increment=1*/
router.put('/updatescore', function (req, res) {
  var db = req.db;
  var collection = db.get('wedstrijden');

  if(req.query.team == 'punten_thuis'){
    console.log("THUIS");
    collection.findOneAndUpdate(
        {wedstrijd_id : req.query.wedstrijd},
        {$inc: {punten_thuis : -1}},
        function(err){
          if(err) throw err;
            res.send('PUT request to the homepage');
        });
  }else{
    console.log("GASTEN");
    collection.findOneAndUpdate(
        {wedstrijd_id : req.query.wedstrijd},
        {$inc: {punten_gasten : req.query.increment}},
        function(err){
          if(err) throw err;
          res.send('PUT request to the homepage');
        });
  }

  /*if(req.query.team == 'punten_thuis'){
    console.log("THUIS");
    collection.findOneAndUpdate({wedstrijd_id : req.query.wedstrijd}, {punten_thuis : req.query.increment}).then((function(){
      res.send('PUT request to the homepage');
    }));
  }else{
    console.log("GASTEN");
    collection.findOneAndUpdate({wedstrijd_id : req.query.wedstrijd}, {punten_gasten : req.query.increment}).then((function(){
      res.send('PUT request to the homepage');
    }));
  }*/


  /*collection.save({wedstrijd_id: req.query.wedstrijd},{punten_thuis: req.query.increment},function(e,docs) {
    res.send('PUT request to the homepage');
  });*/

  /*collection.update({wedstrijd_id: req.query.wedstrijd},
      {$set: {punten_thuis: req.query.increment}}
  );*/

  /*collection.update({wedstrijd_id: req.query.wedstrijd},{punten_thuis: req.query.increment},function(e,docs){
    res.send('PUT request to the homepage');
  });*/

});

module.exports = router;
