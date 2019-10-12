// requiring path & friends dummy data
var path = require("path");
// @ might need to remove .js?
var friends = require("../data/friends");

// setting up the whole function within a module export
module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends.friends);
        console.log("here's the read");
        console.log(friends.friends);
    });
    app.post("/api/friends", function(req,res){
        // @ stupid hardcode array
        let newFriend = new friends.Friend(req.body.name,req.body.picture);
        console.log("this is the request body");
        console.log(req.body.friend);
        console.log(newFriend);
        friends.friends.push(newFriend);
        console.log("this is friends.friends after a new one should have been added");
        console.log(friends.friends);
        res.json(friends.friends);
    });
    // @ keeping this in for testing purposes
    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friends.friends.length = 0;
        res.json({ ok: true });
      });
};

//,req.body.question1,req.body.question2,req.body.question3,req.body.question4,req.body.question5,req.body.question6,req.body.question7,req.body.question8,req.body.question9,req.body.question10,);
