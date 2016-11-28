import {
  describe,
  it,
  before,
  after
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe("Acceptance | b3 - Afficher un QROC | ", function () {

  let application;

  before(function () {
    application = startApp();
  });

  after(function () {
    destroyApp(application);
  });

  before(function () {
    return visit(`/assessments/ref_assessment_id/challenges/ref_qroc_challenge_full`);
  });

  it('b3.1 It should render challenge instruction', function () {
    // instruction is :
    // Un QCM propose plusieurs choix, lutilisateur peut en choisir plusieurs
    expect($('.challenge-instruction').text()).to.equal('Un QROC est une question ouverte avec un simple champ texte libre pour répondre');
  });

  it('b3.2 It should display only one input text as proposal to user', function () {
    expect($('.challenge-proposals input[type="text"]')).to.have.lengthOf(1);
  });

  it('b3.3 Error alert box should be displayed if user validate without checking a checkbox', function () {
    expect($('.alert')).to.have.lengthOf(0);
    findWithAssert('a.challenge-item-actions__validate-action');
    click($('a.challenge-item-actions__validate-action'));
    andThen(() => {
      // assertions for after async behavior
      expect($('.alert')).to.have.lengthOf(1);
      expect($('.alert').text().trim()).to.equal('Pour valider, saisir une réponse. Sinon, passer.');
    });
  });

});
