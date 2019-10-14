// requiring path & friends dummy data
var path = require("path");
// @ might need to remove .js?
var friends = require("../data/friends");
var Friend = require("../data/Friend");
var mysql = require("mysql");
// var match = require("../data/modal");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "friendface"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// setting up the whole function within a module export
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
        console.log("here's the read");
        console.log(friends);
    });
    app.post("/api/friends", function (req, res) {
        let newFriend = new Friend(req.body.name, req.body.picture, parseInt(req.body.question1), parseInt(req.body.question2), parseInt(req.body.question3), parseInt(req.body.question4), parseInt(req.body.question5), parseInt(req.body.question6), parseInt(req.body.question7), parseInt(req.body.question8), parseInt(req.body.question9), parseInt(req.body.question10));
        console.log(friends);
        console.log(newFriend);
        // have to do this before for loop or else there is nothing to compare to
        // @ compare newFriend with friends.friends
        let allScores = [];
        for (let i = 0; i < friends.length; i++) {
            console.log(`here are index ${i}'s scores`);
            console.log(friends[i].scores);
            let scoresComp = [];
            for (let n = 0; n < friends[i].scores.length; n++) {
                scoresComp.push(Math.abs(friends[i].scores[n] - newFriend.scores[n]));

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
        let jsonObj = {
            name: modalName,
            picture: modalPictureURL
        }
        res.json(jsonObj);



    });
    

    //   app.post("/api/easteregg", function(req, res) {

    //     // If the main route is hit, then we initiate a SQL query to grab all records.
    //     // All of the resulting records are stored in the variable "result."
    //     console.log("is anything even happening here");
    //     connection.query("INSERT INTO friends (name,picture,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10) VALUES (?)", [
    //         {
    //         name: req.body.name
    //         },
    //         {
    //         picture: req.body.picture
    //         },
    //         {
    //         question1: parseInt(req.body.question1)
    //         },
    //         {
    //         question2: parseInt(req.body.question2)
    //         },
    //         {
    //         question3: parseInt(req.body.question3)
    //         },
    //         {
    //         question4: parseInt(req.body.question4)
    //         },
    //         {
    //         question5: parseInt(req.body.question5)
    //         },
    //         {
    //         question6: parseInt(req.body.question6)
    //         },
    //         {
    //         question7: parseInt(req.body.question7)
    //         },
    //         {
    //         question8: parseInt(req.body.question8)
    //         },
    //         {
    //         question9: parseInt(req.body.question9)
    //         },
    //         {
    //         question10: parseInt(req.body.question10)
    //     }], function(err, result) {
    //         if (err) throw err;
    //         res.json();
    //         connection.end();
    //       });
    //   });   
};

