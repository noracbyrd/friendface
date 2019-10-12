// friend constructor function to make adding friends easier
function Friend(name,picture,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10){
    this.name = name;
    this.picture = picture;
    this.scores = [question1,question2,question3,question4,question5,question6,question7,question8,question9,question10];
}

module.exports = Friend;