var Campground = require("../models/campgrounds");
var Comment    = require("../models/comment");

var middlewareobj = {};

middlewareobj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err , foundCampground)=>{
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            }else{
                // Does user own the campground ??
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "You Can't edit other's Campground");
                    res.redirect("back");
                }
                
            }
        })
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


middlewareobj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err, foundComment)=>{
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "You Can't edit other's Comment");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareobj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

module.exports = middlewareobj;