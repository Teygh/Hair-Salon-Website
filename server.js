// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

var express = require("express");
var bodyParser = require("body-parser");
require('dotenv').config();

// DEpendencies for passport
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// Static directory
app.use(express.static("public"));

// Set Handlebars.
// =============================================================
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// // Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  })); 
  
  // // Passport init
  app.use(passport.initialize());
  app.use(passport.session());
  
  
  // // Connect Flash
  app.use(flash());
  
  // // Global Vars
  app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require('./routes/userAuth.js')(app,passport)

//load passport strategies
 
require('./config/passport/passport.js')(passport, db.Customers, db.Providers);

// Syncing our sequelize models and then starting our Express app
// =============================================================
//                 Force = true => For Development
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
