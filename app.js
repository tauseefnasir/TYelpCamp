const express        = require('express');
var  app             = express(),
     bodyParser      = require('body-parser'),
     mongoose        = require('mongoose'),
     Campground      = require("./models/campgrounds"),
     seedDB          = require("./seeds");
     Comment         = require("./models/comment")
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

seedDB();

app.get('/', (req, res) => {

    res.render('landings');
});

app.get('/campgrounds', (req, res) => {
//  render all campgrouns
Campground.find({}, (err, campgrounds) =>{
    if(err){
        console.log(err);
    }else{
        res.render('campgrounds/index', { campgrounds: campgrounds });
    }
});
app.get('/campgrounds/new',(req, res) =>{
    res.render('campgrounds/new');
});

// show route
app.get("/campground/:id",(req,res) =>{
    Campground.findById(req.params.id).populate("comments").exec((err ,foundCampground) =>{
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
    
});
  
});

app.post('/campgrounds', (req, res) =>{
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
 
// =================================
// comments routes
// =================================

app.get("/campgrounds/:id/comments/new", (req, res) =>{
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", (req, res)=>{
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
            })
        }
    })
})
app.listen(3000);