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
    });
    app.post("/api/friends", function (req, res) {
        let newFriend = new Friend(req.body.name, req.body.picture, parseInt(req.body.question1), parseInt(req.body.question2), parseInt(req.body.question3), parseInt(req.body.question4), parseInt(req.body.question5), parseInt(req.body.question6), parseInt(req.body.question7), parseInt(req.body.question8), parseInt(req.body.question9), parseInt(req.body.question10));
        // have to do this before for loop or else there is nothing to compare to
        // @ compare newFriend with friends.friends
        let allScores = [];
        for (let i = 0; i < friends.length; i++) {
            let scoresComp = [];
            for (let n = 0; n < friends[i].scores.length; n++) {
                scoresComp.push(Math.abs(friends[i].scores[n] - newFriend.scores[n]));
            }
            allScores.push(scoresComp.reduce((accumulator, currentValue) => accumulator + currentValue));
        }
        let modalName = friends[allScores.indexOf(Math.min(...allScores))].name;
        let modalPictureURL = friends[allScores.indexOf(Math.min(...allScores))].picture;
        // @ need modal HERE before new person gets put into data
        let jsonObj = {
            name: modalName,
            picture: modalPictureURL
        }
        res.json(jsonObj);
        friends.push(newFriend);
    });
    app.get("/api/easteregg", function (req, res) {
        connection.query("SELECT * FROM friends", function (err, result) {
            if (err) throw err;
            // We then begin building out HTML elements for the page.
            var html = "<h1> All the friends! </h1>";
            // Here we begin an unordered list.
            html += "<ul>";
            // We then use the retrieved records from the database to populate our HTML file.
            for (var i = 0; i < result.length; i++) {
                html += "<li><p> ID: " + result[i].id + "</p>";
                html += "<p>Name: " + result[i].name + " </p></li>";
                html += `<img src=${result[i].picture}>`;
            }
            // We close our unordered list.
            html += "</ul>";
            // Finally we send the user the HTML file we dynamically created.
            res.send(html);
        })
    });

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
            // connection.end();
        });

    });

};

