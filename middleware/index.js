var Campground 	= require("../models/campground");
var Comment 	= require("../models/comment");

var middlewareObj={};
//MIDDLEWARE FUNCTIONS

middlewareObj.isOwnerCampground=function (req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				req.flash("error","Error Campground not found");
				console.log(err);
				res.redirect("back");
			}else{
				if(foundCampground.author.id.equals(req.user._id)){
					next();	
				}else{
					req.flash("error","You do not have permission to do that!");
					res.redirect("back");
				}
						
			}
		});
	}else{
		req.flash("error","You need To be LoggedIn first to do that!");
		res.redirect("back");
	}

}
//=============================================================================

//=============================================================================

middlewareObj.isOwnerComment=function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				console.log(err);
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();	
				}else{
					req.flash("error","You do not have permission to do that!");
					res.redirect("back");
				}
						
			}
		});
	}else{
		req.flash("error","You need To be LoggedIn first to do that!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn=function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that !")
	res.redirect("/login");
}

//=============================================================================

module.exports=middlewareObj;