// requiring all the modules!
var path = require("path");
var friends = require("../data/friends");
var Friend = require("../data/Friend");
var mysql = require("mysql");

// setting up our database connection
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
    });
    app.post("/api/friends", function (req, res) {
        // using my constructor function to organize the data
        let newFriend = new Friend(req.body.name, req.body.picture, parseInt(req.body.question1), parseInt(req.body.question2), parseInt(req.body.question3), parseInt(req.body.question4), parseInt(req.body.question5), parseInt(req.body.question6), parseInt(req.body.question7), parseInt(req.body.question8), parseInt(req.body.question9), parseInt(req.body.question10));
        // have to do this before for loop or else there is nothing to compare to
        let allScores = [];
        for (let i = 0; i < friends.length; i++) {
            let scoresComp = [];
            // ye olde nested loops - comparing the user's scores one by one with each of the prior user's scores
            for (let n = 0; n < friends[i].scores.length; n++) {
                scoresComp.push(Math.abs(friends[i].scores[n] - newFriend.scores[n]));
            }
            // reducing all the user's scores to individual numbers so we can compare them against each other
            allScores.push(scoresComp.reduce((accumulator, currentValue) => accumulator + currentValue));
        }
        // the lowest score is the friend at the index of the smallest value (i.e. the overall smallest difference between scores)
        let modalName = friends[allScores.indexOf(Math.min(...allScores))].name;
        let modalPictureURL = friends[allScores.indexOf(Math.min(...allScores))].picture;
        // exporting the match's name and image in a format the frontend can understand:
        let jsonObj = {
            name: modalName,
            picture: modalPictureURL
        }
        res.json(jsonObj);
        // adding the new user to the api after they have first been compared with other users
        // otherwise you'd match with yourself
        // which, frankly, would not be the end of the world - queue up the movie "Isn't It Romantic" for a hilarious and genuine rom com romp on a journey to self love
        friends.push(newFriend);
    });
    app.get("/api/easteregg", function (req, res) {
        // grabbing the user data (just the name and face) from our friendface database
        // thanks to Amy Mebberson for the Disney princess drawing tutorials
        connection.query("SELECT * FROM friends", function (err, result) {
            if (err) throw err;
            // building out the html to generate dynamically for each friend in the database
            var html = "<h1> All the friends! </h1>";
            html += "<ul>";
            for (var i = 0; i < result.length; i++) {
                html += "<li><p> ID: " + result[i].id + "</p>";
                html += "<p>Name: " + result[i].name + " </p></li>";
                html += `<img src=${result[i].picture}>`;
            }
            html += "</ul>";
            res.send(html);
        })
    });
    // saving new entries to the database
    app.post("/api/easteregg", function (req, res) {
        connection.query("INSERT INTO friends (name,picture,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
            req.body.name,
            req.body.picture,
            parseInt(req.body.question1),
            parseInt(req.body.question2),
            parseInt(req.body.question3),
            parseInt(req.body.question4),
            parseInt(req.body.question5),
            parseInt(req.body.question6),
            parseInt(req.body.question7),
            parseInt(req.body.question8),
            parseInt(req.body.question9),
            parseInt(req.body.question10)
        ], function (err, result) {
            if (err) throw err;
            res.json();
        });
        connection.end();
    });
};

