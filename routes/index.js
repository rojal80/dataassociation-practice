var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./posts");
const passport=require('passport');
const localStrategy=require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 router.post('/register',function(req,res){
const {username,email,fullname}=req.body;
const userData=new userModel({username,email,fullname});
userModel.register(userData,req.body.password)
.then(function(){
  passport.authenticate("local")(req,res,function(){
res.redirect('/profile');
  })
})
 })







// // router.get('/createuser',async function(req,res,next){
// //   let createduser=await userModel.create({
// //     username:"rojal",
// //     password:"rojal",
// //     posts:[],
// //     email:"rojal@gmail.com",
// //     fullName:"Rojal Kadariya",
// //   })
// //   res.send(createduser);
// // });

// router.get('/allusersposts', async function(req,res,next){
//   let user=await userModel
//   .findOne({_id:"659bd362771157ae094b6888"})
//   .populate('posts')
//   res.send(user);

// })

// router.get('/createuser',async function(req,res,next){
//   let createduser=await userModel.create({
//     username:"manish",
//     password:"hari",
//     posts:[],
//     email:"manish@gmail.com",
//     fullName:"manish  rai",
//   })
//   res.send(createduser);
// });
// router.get('/createpost',async function(req,res,next){
//   let createdpost=await postModel.create({
//     postText:"Hello My Friends!",
//     user:"659bd362771157ae094b6888"
//   });
//   let user=await userModel.findOne({_id:"659bd362771157ae094b6888"});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("Done");
// });

module.exports = router;
