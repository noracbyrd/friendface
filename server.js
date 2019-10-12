// getting the packages required
var express = require("express");
var path = require("path");


// Sets up the Express App
var app = express();

// Set the port of our application (heroku if availale)
var PORT = process.env.PORT || 8022;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// requiring our routes files (might need to remove the .js?)
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


// server listener!
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });