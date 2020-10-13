var express=require("express");
var router=express.Router();
var Campground = require("../models/campground");
var middleware=require("../middleware")

//==========================================================================
//                              CAMPGROUND ROUTES
//===========================================================================

router.get("/",function(req,res){
	//GET ALL THE CAMPGROUNDS
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err );
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
		}
	});
	//
});
//NEW - show form to create a new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});
//SHOW - shows more info about one campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{

			res.render("campgrounds/show.ejs",{campground: foundCampground});		 
		}
	});

});

//*************************************POST REQUESTS****************************************
router.post("/", middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var price=req.body.price;
	var description=req.body.description;
	var author={
		id:req.user.id,
		username:req.user.username
	}
	var newCampground={name: name,image: image,price:price,description:description,author:author}
	//campgrounds.push(newCampground)
	//CREATE A NEW OBJECT CAMPGROUND AND ADD TO DATABASE
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds"); 
		}
	});
	//DEFAULT is GET request
});
//**********************************************************************************
 
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.isOwnerCampground,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
			res.render("campgrounds/edit",{campground:foundCampground});			
		
	});

});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.isOwnerCampground,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


//DESTRYOYING CAMPGROUND ROUTE************************************************************

router.delete("/:id",middleware.isOwnerCampground,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});


//************************EXPORT************************
module.exports=router;