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

    router.get('/new',(req, res) =>{
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

    router.post('/', (req, res) =>{
        var image = req.body.image;
        var name = req.body.name;
        var disc = req.body.discription;
        var newCampground = {image: image, name: name,discription:disc};
    //    creating new campground
    Campground.create(newCampground, (err,newCampground) =>{
        if(err){
            console.log(); 
          }else{
            res.redirect('/campgrounds');
          }
    })
        
    });
    module.exports = router; 
