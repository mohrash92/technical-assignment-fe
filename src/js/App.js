require('../css/main.scss');

import Button from './Button'
import { getAttackButtonData } from "./utils/getAttackButtonData";
import { updatePlayerScoreAndMessage, getRandomSelectionForComputer } from "./utils/gameUtils";

class App {
	constructor() {
		this.scoreOne = 0;
		this.scoreTwo = 0;
		this.isComputerMode = false;
		this.bindEvents();
		this.getAttackButtonData(response => {
			const jsonData = JSON.parse(response);
			this.data = jsonData.buttonData;
			this.renderAttackButtons(jsonData.buttonData);
		});
		this.startButton.addEventListener('click', this.startGame.bind(this));
		this.computerVsComputer.addEventListener('click', this.switchGameMode.bind(this));
		this.clearButton[0].addEventListener('click', this.resetGame.bind(this));
	}

	renderAttackButtons(buttonData) {
		buttonData.forEach(buttonLabel => {
			let button = new Button();
			button.text = buttonLabel.name;
			button.id = `${buttonLabel.name.toLowerCase()}-button`;
			button.generateButton();
		});
	}

	startGame() {
		this.rockButton = document.getElementById('rock-button');
		this.paperButton = document.getElementById('paper-button');
		this.scissorsButton = document.getElementById('scissors-button');

		this.startGameContainer[0].classList.add("is-hidden");
		this.playersContainer[0].classList.remove("is-hidden");
		this.buttonContainer[0].classList.remove("is-hidden");
		this.computerVsComputer.classList.remove("is-hidden");
		this.clearButton[0].classList.remove('is-hidden');

		this.setDefaultRPSImages();

		this.rockButton.addEventListener('click', this.playerVsComputerGame.bind(this));
		this.scissorsButton.addEventListener('click', this.playerVsComputerGame.bind(this));
		this.paperButton.addEventListener('click', this.playerVsComputerGame.bind(this));
	}

	resetGame() {
		this.scoreMessage.innerHTML = '';
		this.playerOneScore.innerHTML = '0';
		this.playerTwoScore.innerHTML = '0';
		this.scoreOne = 0;
		this.scoreTwo = 0;
		this.setDefaultRPSImages();
	}

	playerVsComputerGame(e) {
		const playerOneSelection = getRandomSelectionForComputer();
		this.playerOneSelectionImage.innerHTML = `<img src="./images/${e.target.innerHTML.toLowerCase()}.png" width="100" height="100">`;
		this.playerChosenSelection = this.data.filter(rpsData => rpsData.name === e.target.innerHTML);

		this.playerTwoSelectionImage.innerHTML = `<img src="./images/${playerOneSelection}.png" width="100" height="100">`;

		this.calculatePlayerScore(this.playerChosenSelection[0], playerOneSelection, this.playerOneScore, this.playerTwoScore, this.scoreMessage);
	}

	computerVsComputerGame() {
		const computerPlayerOneSelection = getRandomSelectionForComputer();
		this.playerOneSelectionImage.innerHTML = `<img src="./images/${computerPlayerOneSelection}.png" width="100" height="100">`;
		this.playerChosenSelection = this.data.filter(rpsData => rpsData.name.toLowerCase() === computerPlayerOneSelection);

		const computerPlayerTwoSelection = getRandomSelectionForComputer();
		this.playerTwoSelectionImage.innerHTML = `<img src="./images/${computerPlayerTwoSelection}.png" width="100" height="100">`;

		this.calculatePlayerScore(this.playerChosenSelection[0], computerPlayerTwoSelection, this.playerOneScore, this.playerTwoScore, this.scoreMessage);
	}

	calculatePlayerScore(playerOneSelection, playerTwoSelection, playerOneElement, playerTwoElement, scoreMessageElement) {
		if(playerOneSelection.beats.toLowerCase() === playerTwoSelection) {
			this.scoreOne++;
			updatePlayerScoreAndMessage("Player 1 Wins", scoreMessageElement, playerOneElement, this.scoreOne);
		} else if (playerOneSelection.name.toLowerCase() === playerTwoSelection) {
			updatePlayerScoreAndMessage("It's a Daw!", scoreMessageElement);
		} else {
			this.scoreTwo++;
			updatePlayerScoreAndMessage("Player 2 Wins", scoreMessageElement, playerTwoElement, this.scoreTwo);
		}
	}

	switchGameMode() {
		this.isComputerMode = !this.isComputerMode;
		if (this.isComputerMode) {
			this.buttonContainer[0].classList.add("is-hidden");
			this.playButton[0].classList.remove("is-hidden");
			this.computerVsComputer.innerHTML = "Player vs Computer";
			this.playButton[0].addEventListener('click', this.computerVsComputerGame.bind(this));
		} else {
			this.buttonContainer[0].classList.remove("is-hidden");
			this.playButton[0].classList.add("is-hidden");
			this.computerVsComputer.innerHTML = "Computer vs Computer";
		}
	}

	setDefaultRPSImages() {
		this.playerOneSelectionImage.innerHTML = '<img src="./images/default.png" width="100" height="100">';
		this.playerTwoSelectionImage.innerHTML = '<img src="./images/default.png" width="100" height="100">';
	}

	bindEvents() {
		this.getAttackButtonData = getAttackButtonData.bind(this);
		this.startButton = document.getElementById('start-game');
		this.startGameContainer = document.getElementsByClassName('start-game-container');
		this.playerOneSelectionImage = document.getElementById('player-one-selection');
		this.playerTwoSelectionImage = document.getElementById('player-two-selection');
		this.playerOneScore =  document.getElementById('player-one-score');
		this.playerTwoScore =  document.getElementById('player-two-score');
		this.playersContainer = document.getElementsByClassName('players-container');
		this.buttonContainer = document.getElementsByClassName('button-container');
		this.scoreMessage = document.getElementById('score-message');
		this.computerVsComputer = document.getElementById('computer-vs-computer');
		this.playButton = document.getElementsByClassName('play-button');
		this.clearButton = document.getElementsByClassName('clear-button');
	}
}

new App();
