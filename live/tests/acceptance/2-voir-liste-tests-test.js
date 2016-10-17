import {
  describe,
  it,
  before,
  after
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe.skip('Acceptance | 2 - voir la liste des tests', function () {

  let application;
  let courses;
  let courseWithoutImage;
  let courseWithAllData;

  before(function () {
    application = startApp();

    server.logging = true;

    courses = server.createList('course-airtable', 6);
    courseWithAllData = courses['1'];

    courseWithoutImage = courses[5];
    courseWithoutImage.attrs.imageUrl = '';
    courseWithoutImage.save();
  });

  after(function () {
    destroyApp(application);
  });

  before(function () {
    return visit('/home');
  });

  it('2.0 peut visiter /home', function () {
    expect(currentPath()).to.equal('home');
  });

  it("2.2 on affiche autant de tests que remontés par l'API", function () {
    expect(findWithAssert('.course')).to.have.lengthOf(6);
  });

  describe('2.3 pour un test donné avec toutes les informations', function () {

    let $course;
    let course;

    before(function () {
      course = courseWithAllData;
      $course = findWithAssert(`.course[data-id="${course.attrs.id}"]`);
    });

    it('2.3.1 on affiche son nom', function () {
      expect($course.find('.course-name').text()).to.contains(courseWithAllData.attrs.name);
    });

    it('2.3.2 on affiche sa description', function () {
      expect($course.find('.course-description').text()).to.contains(courseWithAllData.attrs.description);
    });

    it.skip('2.3.3 on affiche le nombre d\'épreuve(s) qu\'il contient', function () {
      expect($course.find('.course-number-of-challenges').text()).to.contains(courseWithAllData.attrs.challenges.length);
    });

    it('2.3.4 on affiche son image', function () {
      expect($course.find('img')[0].src).to.equal(course.attrs.imageUrl);
    });

    it('2.3.5 on affiche un bouton "démarrer le test"', function () {
      expect($course.find('a.button').text()).to.contains('Démarrer le test');
    });

  });

  it('2.4 pour un test dont il manque l\'image, on affiche une image placeholder', function() {
    const $course = findWithAssert(`.course[data-id="${courseWithoutImage.attrs.id}"]`);
    expect($course.find('img')[0].src).to.contains('images/course-default-image.png');
  });

});
