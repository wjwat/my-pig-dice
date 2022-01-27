function pigDice(numPlayers) {
	this.numPlayers = numPlayers || 2;
	this.turnScore = 0;
	this.currentPlayer = 0;
	this.currentRoll = [];
	this.players = [];
	this.wins = Array(this.numPlayers).fill(0);
	this.dice = new Dice(6, 1);

	for (let i = 0; i < this.numPlayers; i++) {
		this.players.push(new Player());
	}
}

pigDice.prototype.isWinner = function() {
	if (this.players[this.currentPlayer].score + this.turnScore >= 100) {
		this.wins[this.currentPlayer] += 1;
		return true;
	}
	return false;
}

pigDice.prototype.playTurn = function() {
	// Our dice implementation returns an array of roll(s). We're only using one
	// dice, so we just want to take the first roll.
	this.currentRoll = this.dice.roll()[0];

	if (this.currentRoll === 1) {
		this.turnScore = 0;
		this.currentRoll = 0;
		this.endTurn();
	} else {
		this.turnScore += this.currentRoll;
	}
}

pigDice.prototype.endTurn = function() {
	this.players[this.currentPlayer].score += this.turnScore;
	this.turnScore = 0;
	this.currentPlayer = (this.currentPlayer+1 > this.players.length-1) ? 0 : this.currentPlayer+1;
}

pigDice.prototype.newRound = function() {
	this.currentPlayer = 0;
	this.roundScore = 0;
	this.currentRoll = 0;
	this.players.forEach(player => {
		player.score = 0;
	});
}

function Player(name) {
	this.score = 0;
	this.name = name || 'DingDong!';
	this.wins = 0;
}

function Dice(sides, number) {
	this.sides = sides || 6;
	this.number = number || 1;
}

Dice.prototype.roll = function(sides, number) {
	let max = sides || this.sides;
	let rollCount = number || this.number;
	let rolls = [];

	for (let i = 0; i < rollCount; i++) {
		rolls.push(Math.floor(Math.random() * max) + 1);
	}

	return rolls;
}

let pd = new pigDice(5);


// Definitely need to work on my ui
// - Add ability for players to either input a new name, or play with the name
//   dingdong!
// - separate colors for each player (how do we generate colors that don't
//   overlap, and what's the limit of that)
// - just a nicer interface over all, and especially if a roll is 0, and we have
//   to transition to a new player
function displayWinner() {
	alert('Player ' + (pd.currentPlayer+1) + ' '+(pd.players[pd.currentPlayer]+')is a winner!'));
}

function updateDisplay() {
	$('#current-player').text('Currently Player '+ (pd.currentPlayer+1))
	$('#current-score').text('Current Player Score: '+ pd.players[pd.currentPlayer].score);
	$('#round-score').text('Current Round Score: ' + pd.turnScore);
	$('#current-roll').text('Current roll is ' + pd.currentRoll);

	$('#player-scores').text('');
	pd.players.forEach((e, i) => {
		let t = '<h5>Player ' + (i+1) + ' Score: ' + e.score + ' ('+ pd.wins[i]+ ' wins)</h5>';
		$('#player-scores').append(t)
	});
}

function registerClickHandlers() {
	$('#roll').on('click', e => {
		pd.playTurn();
		if (pd.isWinner()) {
			displayWinner();
			pd.newRound();
		}
		updateDisplay();
	});
	$('#hold').on('click', e => {
		pd.endTurn();
		updateDisplay();
	});
}

$(document).ready(() => {
	updateDisplay();
	registerClickHandlers();
});