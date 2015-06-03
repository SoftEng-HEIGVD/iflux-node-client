var
	_ = require('underscore'),
  clientFactory = require('../lib/client.js');

describe("Client", function() {
  var restClient;
	var restClientSpy;
  var Client;

  var print;

  beforeEach(function() {
	  restClientSpy = {
      post: jasmine.createSpy()
    };

    restClient = {
	    Client: function() { return restClientSpy; }
    };

    print = jasmine.createSpy();
    print.andCallFake(function (str) {});

    Client = clientFactory(restClient, print);
  });

  it ("should notify an event with an array of events", function() {
    var client = new Client('http://someUrl', 'sourceId');

	  var event = {
		  setSource: jasmine.createSpy()
	  };

	  spyOn(client, 'notifyEvents').andCallThrough();

    client.notifyEvent(event);

    expect(restClientSpy.post).toHaveBeenCalledWith(
	    'http://someUrl/v1/events', {
		    data: [event],
		    headers: { "Content-Type": "application/json" }
	    },
	    jasmine.any(Function)
    );
	  expect(client.notifyEvents).toHaveBeenCalled();
	  expect(event.setSource).toHaveBeenCalledWith('sourceId');
  });

	it ("should notify events", function() {
		var client = new Client('http://someUrl', 'sourceId');

		var events = [ {
			setSource: jasmine.createSpy()
		}, {
			setSource: jasmine.createSpy()
		}];

		client.notifyEvents(events);

		expect(restClientSpy.post).toHaveBeenCalledWith(
			'http://someUrl/v1/events', {
			  data: events,
			  headers: { "Content-Type": "application/json" }
			},
			jasmine.any(Function)
		);
		expect(events[0].setSource).toHaveBeenCalledWith('sourceId');
		expect(events[1].setSource).toHaveBeenCalledWith('sourceId');
	});
});
