// requiring path & friends dummy data
var path = require("path");
// @ might need to remove .js?
var friends = require("../data/friends");
var Friend = require("../data/Friend")

// setting up the whole function within a module export
module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends);
        console.log("here's the read");
        console.log(friends);
    });
    app.post("/api/friends", function(req,res){
        // @ stupid hardcode array
        let newFriend = new Friend(req.body.name,req.body.picture,parseInt(req.body.question1),parseInt(req.body.question2),parseInt(req.body.question3),parseInt(req.body.question4),parseInt(req.body.question5),parseInt(req.body.question6),parseInt(req.body.question7),parseInt(req.body.question8),parseInt(req.body.question9),parseInt(req.body.question10));
        console.log("this is the request body");
        console.log(newFriend);
        // @ compare newFriend with friends.friends
        // @ commenting forloops while i fix nonsense dotting
        // for (let i=0; i<friends.friends.length; i++){
        //     for (let n=0; n<friends.friends.scores.length; i++)
        // }
        // @ need modal HERE before new person gets put into data
        // friends.friends.push(newFriend);
        console.log("this is friends.friends after a new one should have been added");
        console.log(friends);
        res.json(friends);
    });
    // @ keeping this in for testing purposes
    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friends.length = 0;
        res.json({ ok: true });
      });
};

// loop through each friend in api/friends
// for (var i = 0; i<res.length; i++){
//     for 
    //probably need interlocking for loops, CAN FIGURE IT OUT TOMORROW
    //compare arrays
    //store total in another array
    //from new  array, return lowest number (gotta be a method for that)
// }
