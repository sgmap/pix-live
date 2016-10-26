import {
  describe,
  it,
  before,
  after
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe("Acceptance | 195 - Validation automatique d'un QCU, visualisation du résultat ", function() {

  let application;
  let $summary;


  before(function() {
    application = startApp();
  });

  after(function() {
    destroyApp(application);
  });

  before(function() {
    return visit(`/assessments/completed_assessment_id/results`);
  });

  before(function () {
    $summary = findWithAssert('.table#summary tbody tr');
  });

  it("195.1. Pour un QCU avec une bonne réponse, le tableau récapitulatif donne une indication que la réponse est correcte", function () {
    expect($summary.text()).to.contains('réponse correcte');
  });

  it("195.2. Pour un QCU avec une mauvaise réponse, le tableau récapitulatif donne une indication que la réponse est incorrecte", function () {
    expect($summary.text()).to.contains('réponse incorrecte');
  });

});
