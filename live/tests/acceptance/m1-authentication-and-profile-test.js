import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | Espace compte', function() {

  let application;

  beforeEach(function() {
    application = startApp();

    server.create('user', {
      id: 1,
      firstName: 'François',
      lastName: 'Hisquin',
      email: 'fhi@octo.com',
      password: 'FHI4EVER',
      cgu: true,
      recaptchaToken: 'recaptcha-token-xxxxxx',
      competenceIds: []
    });

  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('m1.1 Accessing to the /compte page while disconnected', function() {
    it('should redirect to the connexion page', function() {
      // when
      visit('/compte');

      // then
      return andThen(function() {
        expect(currentURL()).to.equal('/');
      });
    });
  });

  describe('m1.2 Log-in phase', function() {

    function seedDatabaseForUsualUser() {
      server.loadFixtures('areas');
      server.loadFixtures('competences');
      server.create('user', {
        id: 1,
        firstName: 'Samurai',
        lastName: 'Jack',
        email: 'samurai.jack@aku.world',
        password: 'B@ck2past',
        cgu: true,
        recaptchaToken: 'recaptcha-token-xxxxxx',
        competenceIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      });
    }

    function authenticateUser() {
      // given
      visit('/connexion');
      fillIn('#pix-email', 'samurai.jack@aku.world');
      fillIn('#pix-password', 'B@ck2past');

      // when
      click('.signin-form__submit_button');
    }

    it('should redirect to the /compte after connexion for usual users', function() {
      // given
      seedDatabaseForUsualUser();
      authenticateUser();

      // then
      return andThen(function() {
        expect(currentURL()).to.equal('/compte');
      });
    });
  });

});
