const {describe, it, before, after, beforeEach, expect, sinon} = require('../../../test-helper');
const UserController = require('../../../../lib/application/users/user-controller');

describe('Unit | Router | user-router', () => {

  let server;

  beforeEach(() => {
    server.connection({port: null});
    server.register({register: require('../../../../lib/application/users')});
  });

  function expectRouteToExist(routeOptions, done) {
    server.inject(routeOptions, (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  }

  describe('POST /api/users', () => {

    before(() => {
      sinon.stub(UserController, 'save', (request, reply) => reply('ok'));
    });

    after(() => {
      UserController.save.restore();
    });

    it('should exist', (done) => {
      return expectRouteToExist({method: 'POST', url: '/api/users'}, done);
    });
  });

});
