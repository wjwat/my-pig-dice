// always either 0 or 1
let currentPlayer = 0;
let roundScore = 0;
let currentRoll = 0;
let players = [0, 0];

function rollDice(sides) {
	return Math.floor(Math.random() * sides) + 1;
}

function checkForWinner() {
	if (players[currentPlayer] + roundScore >= 100) {
		alert('Player ' + (currentPlayer+1) + ' is a winner!')
	}
}

function playRound() {
	currentRoll = rollDice(6);
	console.log('playround', currentPlayer, players, currentRoll, roundScore);

	if (currentRoll === 1) {
		roundScore = 0;
		endRound();
	} else {
		roundScore += currentRoll;
	}
	checkForWinner();
}

function endRound() {
	let newCurrentPlayer = currentPlayer + 1;

	if (newCurrentPlayer > players.length-1) {
		newCurrentPlayer = 0;
	}

	players[currentPlayer] += roundScore;
	roundScore = 0;
	currentPlayer = newCurrentPlayer;
}

function updateDisplay() {
	$('#current-player').text('Currently Player '+ (currentPlayer+1))
	$('#current-score').text('Current Player Score: '+ players[currentPlayer]);
	$('#round-score').text('Current Round Score: ' + roundScore);
	$('#current-roll').text('Current roll is ' + currentRoll);
}

function registerClickHandlers() {
	$('#roll').on('click', e => {
		playRound();
		updateDisplay();
	});
	$('#hold').on('click', e => {
		updateDisplay();
		endRound();
		updateDisplay();
	});
}

$(document).ready(() => {
	updateDisplay();
	registerClickHandlers();
});