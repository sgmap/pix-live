import {
  describe,
  it,
  before,
  after
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | 12 - Prévisualisation  d\'un test |', function () {

  let challenges;
  let course;
  let lastChallengeId;

  let application;

  before(function () {
    application = startApp();
  });

  after(function () {
    destroyApp(application);
  });

  describe("Prévisualiser la première page d'un test |", function () {

    before(function () {
      visit(`/courses/first_course_id/preview`);
    });

    it("12.1 L'accès à la preview d'un test se fait en accédant à l'URL /courses/:course_id/preview", function () {
      expect(currentURL()).to.equal(`/courses/first_course_id/preview`);
    });

    let $preview;

    describe('On affiche', function () {

      before(function () {
        $preview = findWithAssert('#course-preview');
      });

      it('12.2 le nom du test', function () {
        expect($preview.find('.course-name').text()).to.contains("First Course");
      });

      it('12.3 la description du test', function () {
        expect($preview.find('.course-description').text()).to.contains("Contient toutes les sortes d\'epreuves");
      });

      it('12.4 un bouton pour démarrer la simulation du test et qui mène à la première question', function () {
        const $playButton = findWithAssert('.simulate-button');
        expect($playButton.text()).to.be.equals('Simuler le test');
        expect($playButton.attr('href')).to.be.equals(`/courses/first_course_id/preview/challenges/ref_qcm_challenge_full_id`);
      });
    });
  });

  describe("Prévisualiser une épreuve dans le cadre d'un test |", function () {

    before(function () {
      visit(`/courses/simple_course_id/preview/challenges/ref_qcm_challenge_full_id`);
    });

    it("12.5 L'accès à la preview d'une épreuve d'un testse fait en accédant à l'URL /courses/:course_id/preview/challenges/:challenge_id", function () {
      expect(currentURL()).to.equal(`/courses/simple_course_id/preview/challenges/ref_qcm_challenge_full_id`);
    });

    describe('On affiche', function () {

      let $challenge;

      before(function () {
        $challenge = findWithAssert('.challenge-preview');
      });

      it("12.6 la consigne de l'épreuve", function () {
        expect($challenge.find('.challenge-instruction').html()).to.contain("Un QCM propose plusieurs choix");
      });

      it("12.7 un bouton pour accéder à l'épreuve suivante", function () {
        expect(findWithAssert('a.challenge-item-actions__validate-action').text()).to.contains('Je valide');
      });
    });
  });

});
