import sinon from "sinon";
import { getAttackButtonData } from "../../../src/js/utils/getAttackButtonData";

describe('getAttackButtonData', () => {
	beforeEach(function() {
		this.xhr = sinon.useFakeXMLHttpRequest();

		this.requests = [];
		this.xhr.onCreate = function(xhr) {
			this.requests.push(xhr);
		}.bind(this);
	});

	afterEach(function() {
		this.xhr.restore();
	});

	it('should parse fetched data as JSON', function(done) {
		const data = {foo: 'bar'};
		var dataJson = JSON.stringify(data);
		getAttackButtonData(function (result) {
			result.should.deep.equal(dataJson);
			done();
		});

		this.requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
	});
});
