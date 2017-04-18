// As early as possible in your application, require and configure dotenv.
// https://www.npmjs.com/package/dotenv#usage
require('dotenv').config();

const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const config = require('./lib/settings');
const logger = require('./lib/infrastructure/logger');

const server = new Hapi.Server({
  'connections': {
    'routes': {
      'cors': true
    }
  }
});

server.connection({ port: config.port });

server.register([

  /* API */
  require('./lib/application/answers'),
  require('./lib/application/assessments'),
  require('./lib/application/challenges'),
  require('./lib/application/courses'),
  require('./lib/application/users'),
  require('./lib/application/followers'),
  require('./lib/application/feedbacks'),
  require('./lib/application/healthcheck'),

  /* Hapi plugins */
  require('inert'),
  require('vision'),
  require('blipp'),
  require('inject-then'),
  {
    register: HapiSwagger,
    options: {
      info: {
        'title': 'PIX API Documentation',
        'version': Pack.version
      },
      documentationPath: '/api/documentation'
    }
  },
  {
    register: require('good'),
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*'
          }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }
], (err) => {
  if (err) logger.error(err);
});

module.exports = server;

