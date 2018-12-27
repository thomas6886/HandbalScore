var express = require('express');
var router = express.Router();

let cookieOptions = {
  maxAge: 1000 * 60 * 60 * 96,
  signed: false
};

/* GET admin page. */
router.get('/', function(req, res, next) {
  if(req.query.username === "handbaldalfsen" && req.query.password === "2T1WgKhZZP6umLNi"){
    res.cookie('ww', '2T1WgKhZZP6umLNi', cookieOptions);
    res.render('admin', {});
  }else{
    res.send('login failed');
  }

});

/*PUT nieuwe score wedstrijd per wedstrijdID. USAGE: url/wedstrijden/updatescore?wedstrijd=WEDSTRIJD&team=punten_thuis&increment=1*/
router.put('/updatescore', function (req, res) {
  if(req.cookies['ww'] === "2T1WgKhZZP6umLNi"){
    var db = req.db;
    var collection = db.get('wedstrijden');

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
  }else{
    res.send('Unauthorized');
  }


});

module.exports = router;