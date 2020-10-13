var express=require("express");
var router=express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleware=require("../middleware");
//==========================================================================
//                              COMMENT ROUTES
//===========================================================================
router.get("/new",middleware.isLoggedIn,function(req,res){
	//find campground by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	});
	
});

router.post("/",middleware.isLoggedIn,function(req,res){
	//lookup campground using id
	//create new comment
	//connect new comment to campground 
	//redirect
	Campground.findById(req.params.id,function(err,campgroundt){
		if(err){
			req.flash("error","Something Went Wrong");
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//Create comment
			Comment.create(req.body.comment,function(err,commentt){
				if(err){
					console.log(err);
				}else{
					commentt.author.id=req.user._id;
					commentt.author.username=req.user.username;
					commentt.save();
					//Associate campground to comment
					campgroundt.comments.push(commentt);
					campgroundt.save();
					console.log(commentt);
					req.flash("success","Successfully added comment");
					res.redirect('/campgrounds/'+campgroundt._id);

				}
			});
		}
	}); 
});

//==========================================================================
//                              EDIT/UPDATE/DELETE
//===========================================================================
router.get("/:comment_id/edit", middleware.isOwnerComment,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			req.flash("error","Comment Not Found");
			res.redirect("back");
		}else{ 
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	});
});

//COMMENT UPDATE
router.put("/:comment_id",middleware.isOwnerComment,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
	
//DELETE COMMENT 
router.delete("/:comment_id",middleware.isOwnerComment,function(req,res){
	//res.send("This is Delete Route");

		Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Deleted Comment");
			res.redirect("/campgrounds/"+ req.params.id );
		}
	});
});
//==========================================================================
//                              	MIDDLEWARE
//===========================================================================


//************************EXPORT************************
module.exports=router;