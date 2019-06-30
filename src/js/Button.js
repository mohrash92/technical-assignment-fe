class Button {
	constructor() {
		this.text = '';
		this.class = 'attack-button';
		this.id = '';
		this.className = 'button-container';
		this.bindElements();
	}

	generateButton() {
		this.buttonElement.innerHTML = this.text;
		this.buttonElement.className = this.class;
		this.buttonElement.id = this.id;
		this.buttonContainer[0].appendChild(this.buttonElement);
	}

	bindElements() {
		this.buttonContainer = document.getElementsByClassName(this.className);
		this.buttonElement = document.createElement('BUTTON');
	}
}

export default Button;
