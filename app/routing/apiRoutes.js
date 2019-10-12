// requiring path & friends dummy data
var path = require("path");
// @ might need to remove .js?
var friends = require("../data/friends");
var Friend = require("../data/Friend");
var match = require("../data/modal");

// setting up the whole function within a module export
module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends);
        console.log("here's the read");
        console.log(friends);
    });
    app.post("/api/friends", function(req,res){
        let newFriend = new Friend(req.body.name,req.body.picture,parseInt(req.body.question1),parseInt(req.body.question2),parseInt(req.body.question3),parseInt(req.body.question4),parseInt(req.body.question5),parseInt(req.body.question6),parseInt(req.body.question7),parseInt(req.body.question8),parseInt(req.body.question9),parseInt(req.body.question10));
        console.log(friends);
        console.log(newFriend);
        // have to do this before for loop or else there is nothing to compare to
        // @ compare newFriend with friends.friends
        let allScores = [];
        for (let i=0; i<friends.length; i++){
            console.log(`here are index ${i}'s scores`);
            console.log(friends[i].scores);
            let scoresComp = [];
            for (let n=0; n<friends[i].scores.length; n++){
                scoresComp.push(Math.abs(friends[i].scores[n]-newFriend.scores[n]));
                
            }
            console.log("here is scores.comp");
            console.log(scoresComp);
            allScores.push(scoresComp.reduce((accumulator, currentValue) => accumulator + currentValue));
          


        }
        console.log("supposedly our index of smallest number:")
        console.log(allScores.indexOf(Math.min(...allScores)));
        console.log(allScores);
        console.log(friends[allScores.indexOf(Math.min(...allScores))]);
        let modalName = friends[allScores.indexOf(Math.min(...allScores))].name;
        let modalPictureURL = friends[allScores.indexOf(Math.min(...allScores))].picture;
        // @ need modal HERE before new person gets put into data
        
        // @ eventually add logic to add new friend
        friends.push(newFriend);
        // console.log("this is friends.friends after a new one should have been added");
        // console.log(friends);
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    // @ keeping this in for testing purposes
    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friends.length = 0;
        res.json({ ok: true });
      });
};

