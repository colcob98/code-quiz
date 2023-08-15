function displayScores () {
    var scoresToDisplay = JSON.parse(localStorage.getItem('highscoreslist'));

    for (var i = 0; i < scoresToDisplay.length; i++) {
        var listTag = document.createElement('li');
        listTag.textContent = (`${highscores[i].initials} - ${highscores[i].score}`);
        var orderedListTag = document.getElementById("highscores");
        orderedListTag.appendChild(listTag);
    }
}

function clearHighscores () {
    localStorage.removeItem("highscoreslist");
    window.location.reload();
}

var clearHighscoresButton = document.getElementById("clear-highscores");
clearHighscoresButton.addEventlistener("click", function(event) {
    event.preventDefault();
    clearHighscores();
});