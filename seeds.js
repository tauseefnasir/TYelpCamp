var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment    = require("./models/comment")


var data = [
    {
        name: "name is tintun",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80",
        discription: "adam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help him"
    },
    {
        name: "name is tintun",
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80",
        discription: "adam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help him"
    },
    {
        name: "name is tintun",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80",
        discription: "adam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help him"
    },
    {
        name: "name is tintun",
        image: "https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80",
        discription: "adam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help himadam is not going school because he is sick and i'm also not gonna come because im gonna help him"
    }
]


function seedDB() {
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("removed all campground");
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("campground added");
                        Comment.create(
                            {
                                text: "This is a great place but i wish there was internet",
                                author: "bolton"
                            }, (err, comment) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                }
                            }
                        )
                    }
                })
            })
        }
    });
}
module.exports = seedDB;