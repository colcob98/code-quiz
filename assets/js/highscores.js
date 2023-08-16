function displayScores () {
    var scoresToDisplay = JSON.parse(localStorage.getItem('highscoreslist'));

    // force the scores to be in order of highest to lowest
    scoresToDisplay.sort(function (a,b) {
        return b.score - a.score;
    })
    
    if (scoresToDisplay !== null) {
        for (var i = 0; i < scoresToDisplay.length; i++) {
            var listTag = document.createElement('li');
            listTag.textContent = scoresToDisplay[i].initials + " - " + scoresToDisplay[i].score;
            var orderedListTag = document.getElementById("highscores");
            orderedListTag.appendChild(listTag);
        }
    }
}

function clearHighscores () {
    localStorage.removeItem("highscoreslist");
    window.location.reload();
}

var clearHighscoresButton = document.getElementById("clear-highscores");
clearHighscoresButton.addEventListener("click", function(event) {
    event.preventDefault();
    clearHighscores();
});

displayScores();