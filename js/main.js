// always either 0 or 1
let currentPlayer = 0;
let roundScore = 0;
let currentRoll = 0;
let players = [0, 0];
let wins = [0, 0];

function rollDice(sides) {
	return Math.floor(Math.random() * sides) + 1;
}

function resetPlayers() {
	currentPlayer = 0;
	roundScore = 0;
	currentRoll = 0;
	players = [0, 0];
}

function checkForWinner() {
	if (players[currentPlayer] + roundScore >= 100) {
		alert('Player ' + (currentPlayer+1) + ' is a winner!');
		wins[currentPlayer] += 1;		
		resetPlayers();
	}
}

function playRound() {
	currentRoll = rollDice(6);
	console.log('playround', currentPlayer, players, currentRoll, roundScore);

	if (currentRoll === 1) {
		roundScore = 0;
		currentRoll = 0;
		endRound();
	} else {
		roundScore += currentRoll;
	}
}

function endRound() {
	players[currentPlayer] += roundScore;
	roundScore = 0;
	currentPlayer = (currentPlayer+1 > players.length-1) ? 0 : currentPlayer+1;
}

function updateDisplay() {
	$('#current-player').text('Currently Player '+ (currentPlayer+1))
	$('#current-score').text('Current Player Score: '+ players[currentPlayer]);
	$('#round-score').text('Current Round Score: ' + roundScore);
	$('#current-roll').text('Current roll is ' + currentRoll);

	$('#player-scores').text('');
	players.forEach((e, i) => {
		let t = '<h5>Player ' + (i+1) + ' Score: ' + e + ' ('+ wins[i]+ ' wins)</h5>';
		$('#player-scores').append(t)
	});
}

function registerClickHandlers() {
	$('#roll').on('click', e => {
		playRound();
		checkForWinner();
		updateDisplay();
	});
	$('#hold').on('click', e => {
		endRound();
		updateDisplay();
	});
}

$(document).ready(() => {
	updateDisplay();
	registerClickHandlers();
});