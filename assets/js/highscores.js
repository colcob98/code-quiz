function displayScores () {
    //retrieve highscores from local storage for rendering
    var scoresToDisplay = JSON.parse(localStorage.getItem('highscoreslist'));

    // force the scores to be in order of highest to lowest
    scoresToDisplay.sort(function (a,b) {
        return b.score - a.score;
    })

    //create and append listed elements as they are added to local storage
    if (scoresToDisplay !== null) {
        for (var i = 0; i < scoresToDisplay.length; i++) {
            var listTag = document.createElement('li');
            listTag.textContent = scoresToDisplay[i].initials + " - " + scoresToDisplay[i].score;
            var orderedListTag = document.getElementById("highscores");
            orderedListTag.appendChild(listTag);
        }
    }
}

// function for clearing highscores record from local storage
function clearHighscores () {
    localStorage.removeItem("highscoreslist");
    window.location.reload();
}

// assigning the above function to relevant button
var clearHighscoresButton = document.getElementById("clear-highscores");
clearHighscoresButton.addEventListener("click", function(event) {
    event.preventDefault();
    clearHighscores();
});

displayScores();