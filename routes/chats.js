const { Router} = require('express');
const { brotliDecompress } = require('zlib');
const router = Router();
const connection = require('../db');

const mongodb = require('mongodb');
// const {ObjectId} = require('mongodb');

router.get('/', async(req, res)=>{
  const db = await connection();
  db.collection('chats').find()
  .toArray(function(err, chats){
      res.json(chats)
  })
});


module.exports = router;