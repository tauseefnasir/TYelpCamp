const express        = require('express');
var  app             = express(),
     bodyParser      = require('body-parser'),
     passport        = require("passport"),
     LocalStrategy   = require("passport-local"),
     mongoose        = require('mongoose'),
     Campground      = require("./models/campgrounds"),
     User            = require("./models/user")
     seedDB          = require("./seeds");
     Comment         = require("./models/comment");

// requiring routes

var commentRoutes      = require("./routes/comments"),
    campgroundsRoutes  = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index");
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

seedDB();


// passport configuration
app.use(require("express-session")({
    secret:"secret is secret",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000);