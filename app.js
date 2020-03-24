// Requiring Dependencies
var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/user"),
  seedDB = require("./seedDB");

// App config
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
//seedDB();

// DB config
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Passport Config
app.use(
  require("express-session")({
    secret: "CaptionIngo",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Requring Routes
var routes = require("./routes/index");
app.use("/", routes);

// Run server
var port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has started!");
});
