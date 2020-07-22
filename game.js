let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;

$("div[type=button]").on("click", function () {
    if (level === 1) {
        return alert("Press any key to start the game");
    }
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function () {
    if (level === 1) {
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").innerText(`Level ${level}`);
}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $("h1").text("Game over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 800);
        startOver();
    }
}

function startOver() {
    level = level * 0 + 1;
    console.log(level);
    gamePattern = [];
    console.log(gamePattern);
}
