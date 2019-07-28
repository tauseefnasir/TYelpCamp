var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");

// INDEX  show all campgrounds

router.get('/', (req, res) => {
    //  get all campground from db
    Campground.find({}, (err, campgrounds) =>{
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index', { campgrounds: campgrounds});
        }
    });

// NEW - show form to create new campground 

    router.get('/new', isLoggedIn ,(req, res) =>{
        res.render('campgrounds/new');
    });
    
// SHOW - show more info about a campground
    router.get("/:id",(req,res) =>{
        Campground.findById(req.params.id).populate("comments").exec((err ,foundCampground) =>{
            if(err){
                console.log(err);
      
            }else{
                res.render("campgrounds/show",{campground: foundCampground});
            }
        });
        
    });
      
    });
    
// CREATE -add new campgrounds to db

    router.post('/', isLoggedIn , (req, res) =>{
        var image = req.body.image;
        var name = req.body.name;
        var disc = req.body.discription;
        var author = {
            id: req.user.id,
            username: req.user.username
        }
        var newCampground = {image: image, name: name,discription:disc, author: author};


    //    creating new campground
    Campground.create(newCampground, (err,newCampground) =>{
        if(err){
            console.log(); 
          }else{
            res.redirect('/campgrounds');
          }
    })
     
    });
        
// middlewere
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
    module.exports = router; 
