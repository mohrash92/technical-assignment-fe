import { updatePlayerScoreAndMessage } from "../../../src/js/utils/gameUtils";

describe('updatePlayerScoreAndMessage', () => {
	document.body.innerHTML = `<!doctype html>
<html>
<head>
	<title>JSDOM unit test</title>
	<meta charset="UTF-8">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div class="game">
	<button id="computer-vs-computer" class="rps-button is-hidden">Computer vs Computer</button>
	<p id="score-message"></p>
	<div class="players-container is-hidden">
		<div class="player-one-container">
			<p>Player 1</p>
			<p id="player-one-score">0</p>
			<div id="player-one-selection">
			</div>
		</div>
		<div class="player-two-container">
			<p>Player 2</p>
			<p id="player-two-score">0</p>
			<div id="player-two-selection">
			</div>
		</div>
	</div>
	<div class="button-container is-hidden"></div>
	<button class="play-button rps-button is-hidden">Play</button>
	<button class="clear-button rps-button is-hidden">Restart Game</button>
</div>
<div class="start-game-container">
	<h1>Welcome to the RPS game</h1>
	<button id="start-game" class="rps-button">Start Game</button>
</div>
</body>
</html>
`;

	const scoreMessageElement = document.getElementById('score-message');
	const playerOneScoreElement = document.getElementById('player-one-score');

	it('should update the score message with the message that is passed in ', () => {
		updatePlayerScoreAndMessage('player one wins', scoreMessageElement, '', 0);
		expect(scoreMessageElement.innerHTML).to.equal('player one wins');
	});

	it('should update the player score with the score that is passed in ', () => {
		updatePlayerScoreAndMessage('', scoreMessageElement, playerOneScoreElement, 2);
		expect(playerOneScoreElement.innerHTML).to.equal('2');
	});

	it('should not update the player score when it is not passed in', () => {
		updatePlayerScoreAndMessage('', scoreMessageElement, playerOneScoreElement);
		expect(playerOneScoreElement.innerHTML).to.equal('2');
	});
});
