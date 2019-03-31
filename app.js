const express = require('express');
var  app             = express(),
     bodyParser      = require('body-parser'),
     mongoose        = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// schema setup
var campgroundSchema = new mongoose.Schema({
 name: String,
 image: String,
 discription: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.get('/', (req, res) => {

    res.render('landings');
});

app.get('/campgrounds', (req, res) => {
//  render all campgrouns
Campground.find({}, (err, campgrounds) =>{
    if(err){
        console.log(err);
    }else{
        res.render('index', { campgrounds: campgrounds });
    }
});
app.get('/campgrounds/new',(req, res) =>{
    res.render('new');
});
app.get("/campground/:id",(req,res) =>{
    Campground.findById(req.params.id , (err ,foundCampground) =>{
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground: foundCampground});
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



app.listen(3000);