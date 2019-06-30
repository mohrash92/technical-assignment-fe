import Button from '../../src/js/Button';

describe('Button', () => {
	describe('generateButton', () => {
		document.body.innerHTML = `<!doctype html>
<html>
<head>
	<title>JSDOM unit test</title>
	<meta charset="UTF-8">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div class="button-container"></div>
</div>
</body>
</html>`;

		it('generates a new button in the button-container', () => {
			let button = new Button();
			button.text = 'A new button';
			button.id =  'button-id';
			button.generateButton();

			expect(document.getElementById('button-id').innerHTML).to.equal('A new button');
			expect(document.getElementById('button-id').id).to.equal('button-id');
		});
	});
});
