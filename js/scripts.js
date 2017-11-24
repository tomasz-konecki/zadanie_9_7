var newGameElem = document.getElementById('js-newGameElement'),
    newGameBtn = document.getElementById('js-newGameButton'),
    pickElem = document.getElementById('js-playerPickElement'),
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult'),
    finalWinElem = document.getElementById('js-finalWinner'),
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };


newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() {
    startRound('rock')
});
pickPaper.addEventListener('click', function() {
    startRound('paper')
});
pickScissors.addEventListener('click', function() {
    startRound('scissors')
});

function setGameElements(gameState) {
    switch (gameState) {
        case 'started':
            newGameElem.classList.add("hidden");
            pickElem.classList.remove("hidden");
            resultsElem.classList.remove("hidden");
            finalWinElem.classList.add("hidden");
            playerPickElem.innerText = 'Player selection';
            computerPickElem.innerText = 'Computer selection';
            playerResultElem.innerText = 'Player Score';
            computerResultElem.innerText = 'Computer Score';
            break;
        case 'ended':
            newGameBtn.innerText = 'Play again';
            finalWinElem.classList.remove("hidden");
            playerPickElem.innerText = '';
            computerPickElem.innerText = '';
            playerResultElem.innerText = '';
            computerResultElem.innerText = '';
        case 'notStarted':
        default:
            newGameElem.classList.remove("hidden");
            pickElem.classList.add("hidden");
            resultsElem.classList.add("hidden");
    }
}

function newGame() {    
    player.name = prompt('Please enter your name', 'player name');
    if (player.name) {
        player.score = computer.score = 0;
        setGameElements('started');

        playerNameElem.innerText = player.name;
        setGamePoints();
    }
}

function startRound(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerText = playerPick;
    computerPickElem.innerText = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

function setGamePoints() {
    playerPointsElem.innerText = player.score;
    computerPointsElem.innerText = computer.score;
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerText = computerResultElem.innerText = '';
    var winnerIs = 'player';

    if (playerPick === computerPick) {
        winnerIs = 'none'; // remis
    } else if (
        (computerPick === 'rock' && playerPick === 'scissors') ||
        (computerPick === 'scissors' && playerPick === 'paper') ||
        (computerPick === 'paper' && playerPick === 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs === 'player') {
        playerResultElem.innerText = "Win!";
        player.score++;
    } else if (winnerIs === 'computer') {
        computerResultElem.innerText = "Win!";
        computer.score++;
    }
    setGamePoints();
    checkFinalWinner(player.score, computer.score);
}

function checkFinalWinner(playerScore, computerScore) {
    if (playerScore === 10) {
        finalWinElem.innerText = `The winner is ${player.name}`;
        setGameElements('ended');
    }
    if (computerScore === 10) {
        finalWinElem.innerText = `The winner is computer`;
        setGameElements('ended');
    }
}

setGameElements('notStarted');
