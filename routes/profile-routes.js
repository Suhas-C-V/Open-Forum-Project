const express = require('express');
const router = express.Router();
var middleware = require('../middleware');
const db = require('../config/db');

router.get('/',middleware.isLoggedIn,(req,res)=>{
    console.log(req.user);
    res.render('profile',{user: req.session.user_id});
});

router.get('/lead',(req,res)=>{
    let sql = 'SELECT u.name,u.email,us.total_posts,us.total_comments,us.Points FROM users u,user_scores us WHERE u.user_id = us.user_id ORDER BY Points DESC';
    db.query(sql,(err,data)=>{
        if(err){
            res.status(500).json(err);
            throw err;
        }else{
            let lead = JSON.parse(JSON.stringify(data));
            res.json(lead);
        }
    });
});

module.exports = router;