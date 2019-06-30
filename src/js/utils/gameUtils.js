export const updatePlayerScoreAndMessage = (message, scoreMessageElement, playerScoreElement, playerScore = 0) => {
	if (playerScore) {
		playerScoreElement.innerHTML = playerScore;
	}
	scoreMessageElement.innerHTML = message;
};

export const getRandomSelectionForComputer = () => {
	const moves = ['rock', 'paper', 'scissors'];
	return moves[Math.floor(Math.random() * moves.length)];
};
