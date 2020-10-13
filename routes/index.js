var express=require("express");
var router=express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");
//==========================================================================
//                              LANDING PAGE
//===========================================================================
router.get("/",function(req,res){
	res.render("landing");
});
//==========================================================================
//                              AUTH  ROUTES
//===========================================================================

//********************REGISTER****************
router.get("/register",function(req,res){
	res.render("register");
});
//HANDLING USER SIGN IN
router.post("/register",function(req,res){

	var newUser=new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){ 
			req.flash("success","Welcome To YelpCamp "+user.username);
			res.redirect("/campgrounds");
		});
	});
});

//***********LOGIN****************
router.get("/login",function(req,res){

	res.render("login");
});
//middleware runs before final call
router.post("/login",passport.authenticate("local",{

	successRedirect: "/campgrounds",
	failureRedirect: "/login"

}),function(req,res){
	
});
//**************LOGUT****************************
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged You Out!");
	res.redirect("/campgrounds");
});

// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

//************************EXPORT************************
module.exports=router;