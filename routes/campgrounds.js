var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");

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

    router.get('/new', middleware.isLoggedIn ,(req, res) =>{
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

    router.post('/', middleware.isLoggedIn , (req, res) =>{
        var image = req.body.image;
        var name = req.body.name;
        var price = req.body.price;
        var disc = req.body.discription;
        var author = {
            id: req.user.id,
            username: req.user.username
        }
        var newCampground = {image: image,price: price, name: name,discription:disc, author: author};


    //    creating new campground
    Campground.create(newCampground, (err,newCampground) =>{
        if(err){
            console.log(err); 
          }else{
            req.flash("success", "Campground added successfully");
            res.redirect('/campgrounds');
          }
    })
     
    });
        
//Edit Campground Route

router.get("/:id/edit",middleware.checkCampgroundOwnership, (req,res)=>{
   
    Campground.findById(req.params.id, (err , foundCampground)=>{
        res.render("campgrounds/edit", {campground: foundCampground});
               
           
        })
   
    
})
//Update Campground route
router.put("/:id",middleware.checkCampgroundOwnership, (req ,res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground deleted Successfully");
            res.redirect("/campgrounds");
        }
    })
});
    module.exports = router; 
