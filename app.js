const express = require('express');

var app = express();

app.set("view engine", "ejs");

app.get('/', (req ,res) => {
    
res.render('landings');
});

app.get('/campgrounds', (req ,res) => {
    var campgrounds = [
        {name: "Saghr",image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
        {name: "Ratigali",image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg"},
        {name: "Talagang",image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name: "Chakwal",image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104490f1c571a2e4b4b8_340.jpg"},
    ]
    res.render('campgrounds', {campgrounds: campgrounds} );
    });
    



app.listen(3000);