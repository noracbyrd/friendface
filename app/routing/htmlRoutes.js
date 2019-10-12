// requiring path
var path = require("path");

// setting up the whole function within a module export
module.exports = function(app){
    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    })
    // catch all so that everything else goes to the homepage
    app.get("*", function(req,res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    })
};