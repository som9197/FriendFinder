var friends = require("./../data/friends");

module.exports = function(app) {

  app.get("/friends", function(req, res) {
    res.json(friends);
  });
  app.post("/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference = 0;

    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      //loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        //calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If  sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch to be the new friend.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);

  });

};