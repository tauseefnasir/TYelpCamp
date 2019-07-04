var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var Comment   = require("../models/comment")

router.get("/campgrounds/:id/comments/new",isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments",isLoggedIn, (req, res)=>{
    console.log(req.params);
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            console.log(req.body)
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/" + campground._id);  
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
module.exports = router;