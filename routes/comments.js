var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment   = require("../models/comment");


// comments new
router.get("/new",isLoggedIn, (req, res) =>{
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});


// comment creat
router.post("/",isLoggedIn, (req, res)=>{
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
                    res.redirect("/campgrounds/" + campground._id);  
                }
            });
        }
    });
});


// middlewere
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
module.exports = router;