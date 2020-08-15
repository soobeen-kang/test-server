const express = require('express');
const { listen } = require('../app');
const router = express.Router();
const pool = require('../utils/mysql');
const crypto =require('crypto');
const jwt=require('jsonwebtoken');

/* GET users listing. */
router.get('/', async (req, res, next) => {
/*
  connection.query('SELECT * FROM ACCOUNT_TB', (err, results) =>{
    let sum = 0;
    for (let user of results){
      sum += user.MONEY;
    }
    console.log(sum);
    const avg = sum / results.length;
    connection.query('SELECT * FROM ACCOUNT_TB WHERE MONEY > ?', [avg], (err, results2)=>{
    res.json({status:200, arr:results2});
  })
  })
*/
try{
const connection = await pool.getConnection();
const [results] = await connection.query('SELECT * FROM ACCOUNT_TB');
let sum = 0;
for (let user of results){
  sum += user.MONEY;
}
const avg = sum / results.length;
const [results2] = await connection.query('SELECT*FROM ACCOUNT_TB WHERE MONEY > ?', [avg])
res.json({status:200, arr:results2});
}
catch(err){
  res.json({status:500, msg:"에러가 났어요!"});
}
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

router.get('/bestreview', async (req, res, next) => {
  
  try{
  const connection = await pool.getConnection();
  const [results3] = await connection.query('SELECT * FROM REVIEWS_TB');
  let maximum = 0;
  let bestreviewer = 0;
  let bestuser = 0;
  var bestusername = "";

  for (let user of results3){
    if(user.VIEWS > maximum){
      maximum = user.VIEWS;
    }
  }
  const [results4] = await connection.query('SELECT*FROM REVIEWS_TB WHERE VIEWS = ?', [maximum])


  for(let user2 of results4){
    bestreviewer = user2.USER_ID;
  }

  const [results5] = await connection.query('SELECT * FROM USER_TB');

  for(let user3 of results5){
    if(user3.ID = bestreviewer){
      bestuser=user3.ID;
    }
  }
  const [results6] = await connection.query('SELECT*FROM USER_TB WHERE ID = ?', [bestuser]);
  for(let user4 of results6){
    bestusername = user4.NAME;
  }

  res.json({status:200, arr:results4, arr2:bestreviewer, arr3:results6, arr4:bestusername });
  }

  catch(err){
    res.json({status:500, msg:"에러가 났어요!"});
  }
  });


  router.post('/a', async (req, res, next) => {
    
    try{
      const body = req.body;
      const name =req.body.name;
      const address =req.body.address;
      const birth=req.body.birth;
      const id=req.body.id;
      const pwd = req.body.pwd;
      
      const salt = await crypto.randomBytes(64);//임의의 문자 생성
      const saltString = salt.toString('base64');//문자화 시킴
      const hashedPwd =crypto.pbkdf2Sync(pwd, saltString, 100000, 64, 'SHA512');
      const hashedPwdString = hashedPwd.toString('base64');

    const connection = await pool.getConnection();
    await connection.query('INSERT INTO USER_TB(NAME, ADDRESS, BIRTH, user_id, hashed_pwd, pwd_salt) VALUES(?, ?, ?, ?, ?, ?)',[name,address,birth, id, hashedPwdString,saltString]);
    
    res.json({status:201, msg:'성공'});
    }
    catch(err){
      console.log(err);
      res.json({status:500, msg:"에러가 났어요!"});
      };
      
    });

    router.post('/login', async (req, res, next) => {
    
      try{
        const body = req.body;
        const user_id = req.body.user_id;
        const pwd = req.body.pwd;
        
        const connection = await pool.getConnection();
        const [users] = await connection.query('SELECT * FROM USER_TB WHERE user_id = ?', [user_id]);
        if (users.length === 0){
          return res.json({ status:401, msg:"일치하지 않는 아이디에요!"})
        }
        const user =users[0];
        const loginHashedPwd = crypto.pbkdf2Sync(pwd, user.pwd_salt,100000, 64,'SHA512');
        if (loginHashedPwd.toString('base64') !== user.hashed_pwd) {
          return res.json({ status:401, msg:"일치하지 않는 비밀번호에요!"})
        }

       
        res.redirect('http://localhost:3000/mymovie');
        
      }
      catch(err){
        console.log(err);
        res.json({status:500, msg:"에러가 났어요!"});
      }
      });
    
      router.get('/moviereview', async (req, res, next) => {
  
        try{
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM MYREVIEW_TB');
        let title= results[0].TITLE;
        let review= results[0].REVIEW;
        let score= results[0].SCORE;
      
        res.json({status:200, arr:title, arr1:review, arr2:score });
        }
      
        catch(err){
          res.json({status:500, msg:"에러가 났어요!"});
        }
        });


   

module.exports = router;


