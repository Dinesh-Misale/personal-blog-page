const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even know we were calling him Big Bear. We never had the chance to. Maybe it was the eleven months he spent in the womb. The doctor said there were claw marks on the walls of her uterus. Yeah, well, have you seen the new Mustang?";
const aboutContent = "The first mate and his Skipper too will do their very best to make the others comfortable in their tropic island nest. Michael Knight a young loner on a crusade to champion the cause of the innocent. The helpless. The powerless in a world of criminals who operate above the law. Here he comes Here comes Speed Racer. He's a demon on wheels.";
const contactContent = "Baseball ipsum dolor sit amet cellar rubber win hack tossed. Slugging catcher slide bench league, left fielder nubber. Bullpen blue run rotation relief pitcher grass umpire. Forkball bullpen suicide squeeze club bush league field sport. Base cookie triple play blue hot dog relay rake starting pitcher inning.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
// console.log(posts);
app.get("/", function(req, res){
  
  res.render("home", {homecontent: homeStartingContent, postlist: posts});
});

app.get("/contact", function(req, res){
  res.render("contact", {ContactContent: contactContent})
})

app.get("/about", function(req, res){
  res.render("about", {AboutContent: aboutContent})
})

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  var data= {
    title: req.body.postTitle,
    description: req.body.postBody
  };
  posts.push(data);
  res.redirect("/");
  
});

app.get("/post/:testing", function(req, res){
  const paraValue = _.lowerCase(req.params.testing);
  posts.forEach((element) => {
    if(element.title == paraValue){
      res.render("post", {title: element.title, content : element.description});
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
