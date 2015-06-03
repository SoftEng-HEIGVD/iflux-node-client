// # iFLUX Client
// Helps to make iFLUX communications in NodeJS apps.
var ioc = require('./lib/ioc');

module.exports = {
  Client: ioc.create('client'),
	Event: ioc.create('event'),
  version: require('./package').version
};
