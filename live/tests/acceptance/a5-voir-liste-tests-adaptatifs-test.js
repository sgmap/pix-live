import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance | a5 - voir la liste des tests adaptatifs', function () {

  let application;

  before(function () {
    application = startApp();
  });

  after(function () {
    destroyApp(application);
  });

  before(function () {
    return visit('/placement-tests');
  });

  it('a5.1 on affiche autant de tests que remontés par l\'API', function () {
    expect(findWithAssert('.course')).to.have.lengthOf(1);
  });

  describe('a5.2 pour un test donné avec toutes les informations', function () {

    let $course;

    before(function () {
      $course = findWithAssert('.course[data-id="adaptive_course_id"]');
    });

    it('a5.2.1 on affiche son nom', function () {
      const courseTitle = 'Adaptive Course';
      expect($course.find('.course-name').text()).to.contains(courseTitle);
    });

    it('a5.2.2 on affiche sa description', function () {
      const courseDescription = 'Est un test adaptatif.';
      expect($course.find('.course-description').text()).to.contains(courseDescription);
    });

    it('a5.2.3 on affiche son image', function () {
      const courseIllustrationUrl = 'http://fakeimg.pl/350x200/?text=Adaptive%20Course';
      expect($course.find('img')[0].src).to.equal(courseIllustrationUrl);
    });

    it('a5.2.4 on affiche un bouton "démarrer le test"', function () {
      expect($course.find('a.button').text()).to.contains('Démarrer le test');
    });

  });

});
