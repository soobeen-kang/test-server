var express = require('express');
const { listen } = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource hoho');
});

router.get('/hoho', function(req, res, next) {
  res.send('hoho');
});


router.get('/kaka', function(req, res, next) {
  res.json({status:200, msg:'success'});
});


router.get('/giveme', function(req, res, next) {
  
  let ry=Math.round(Math.random()*9);
  let ry1=Math.round(Math.random()*9);
  let ry2=Math.round(Math.random()*9);
  let ry3=Math.round(Math.random()*9);
  let ry4=Math.round(Math.random()*9);


  res.json({status:ry, status1:ry1, status2:ry2, status3:ry3, status4:ry4});
});



module.exports = router;
