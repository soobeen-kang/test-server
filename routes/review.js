const express = require('express');
const router = express.Router();

const pool = require('../utils/mysql')


router.post('/', async (req, res) => {
  try { const body = req.body;
   const title = body.title;
   const score = body.score;
   const review = body.review;
   
   const connection = await pool.getConnection()
   const [results] = await connection.query('INSERT INTO MYREVIEW_TB (TITLE, SCORE, REVIEW) values (?, ?, ?)', [title, score, review]);
 
   console.log(results);

   res.json({stastus:200, msg:'성공!'});
  } catch (err){
   console.log(err)
   res.json({status:500, msg:'에러!'})
  }
 })


  module.exports = router


