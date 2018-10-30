const basicAuth = require('basic-auth');
const config = require('./config.js');

module.exports = function(req, res, next) {
  const creds = basicAuth(req);

  const useAuth = config.user && config.password;

  if (!useAuth || (creds && creds.name === config.user && creds.pass === config.password)) {
    next();
    return;
  }

  res
    .status(401)
    .set('WWW-Authenticate', 'Basic realm="Node"')
    .end('Access denied');
};
