// dummy data for testing
let friends = [
    {
        "name": "Ariel",
        "photo": "https://upload.wikimedia.org/wikipedia/en/7/77/Ariel_disney.png",
        "scores": [
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
function Friend(){
    this.name = name;
    this.photo = photo;
    this.scores = scores;
}

module.exports = friends;
//might have to tweak the below
module.exports = Friend;