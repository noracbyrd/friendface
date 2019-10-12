// dummy data for testing
let friends = [
    {
        name: "Ariel",
        picture: "https://upload.wikimedia.org/wikipedia/en/7/77/Ariel_disney.png",
        scores: [
            5,
            1,
            4,
            4,
            5,
            1,
            2,
            5,
            4,
            1
        ]
    }
]

// friend constructor function to make adding friends easier
function Friend(name,picture,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10){
    this.name = name;
    this.picture = picture;
    this.score = [question1,question2,question3,question4,question5,question6,question7,question8,question9,question10];
}

module.exports = {
    friends,
    Friend
}