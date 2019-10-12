// requiring path & friends dummy data
var path = require("path");
// @ might need to remove .js?
var friends = require("../data/friends");
var Friend = require("../data/friends");

// setting up the whole function within a module export
module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends);
    });
    app.post("/api/friends", function(req,res){
        let newFriend = new Friend(req.body.name,req.body.photo,req.body.scores);
        friends.push(newFriend);
        res.json(friends);
    });
    // @ keeping this in for testing purposes
    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friends.length = 0;
        res.json({ ok: true });
      });
};


