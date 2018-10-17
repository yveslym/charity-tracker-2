//
// var express = require('express');
// var router = express.Router();
// var User = require('../models/User');
// var mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
//
// // Show: show user
// router.get('/:id',(req,res)=>{
//
// })
//
// // create new user
// router.get('/register',(req,res, _, err)=>{
//     console.log('start user sign up');
//     console.log(err)
//     res.render('signup');
// })
//
// // Register: register user
// router.post('/signup',(req,res,next)=>{
//     console.log('start signing up');
//     console.log(req.body);
//     bcrypt.hash(req.body.password,10,(err, hash)=>{
//
//         if (err){
//             return res.status(500).json({
//                 error:err
//             });
//         }
//         else{
//             var user = new User({
//                 _id : new mongoose.Types.ObjectId(),
//                 password : hash,
//                 email: req.body.email,
//                 firstName:req.body.firstname,
//                 lastName:req.body.lastname,
//                 username: req.body.username
//                 });
//                 user.save().then(result =>{
//                     res.status(201).json({
//                         message: 'user created'
//                     });
//                 })
//                 .catch(err =>{
//                     console.log(err);
//                     res.status(500).json({
//                         error:err
//                     });
//                 })
//
//         }
//     })
// })
//
//
//
// module.exports = router;
