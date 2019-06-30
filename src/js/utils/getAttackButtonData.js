export const getAttackButtonData = callback => {
	const xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'data/buttonData.json', true);
	xobj.setRequestHeader('Content-Type', 'application/json')
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
	};
	xobj.send();
};
