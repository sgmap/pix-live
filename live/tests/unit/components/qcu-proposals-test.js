import _ from 'pix-live/utils/lodash-custom';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Component | QCU proposals', function() {

  setupTest('component:qcu-proposals', {});

  /* Computed property "labeledRadios"
   ----------------------------------------------------- */

  describe('Computed property "labeledRadios"', function() {

    const DEFAULT_PROPOSALS = '- prop 1\n- prop 2\n- prop 3';
    const DEFAULT_ANSWERS = [false, true, false];
    const PROPOSAL_TEXT = 0;
    const BOOLEAN_ANSWER = 1;

    let answersValue;
    let proposals;
    let component;

    beforeEach(function() {
      proposals = DEFAULT_PROPOSALS;
      answersValue = DEFAULT_ANSWERS;
    });

    function initComponent() {
      component = this.subject();
      component.set('proposals', proposals);
      component.set('answersValue', answersValue);
    }

    /*
     * Ex :
     * - proposals = ['prop 1', 'prop 2', 'prop 3']
     * - answersValue = [false, true, false]
     *
     * => labeledRadios = [['prop 1', false], ['prop 2', true], ['prop 3', false]]
     */
    it('should return an array of [<proposal_text>, <boolean_answer>]', function() {
      // given
      initComponent.call(this);

      // when
      const labeledRadios = component.get('labeledRadios');

      // then
      expect(labeledRadios[0][PROPOSAL_TEXT]).to.equal('prop 1');
      expect(labeledRadios[0][BOOLEAN_ANSWER]).to.equal(DEFAULT_ANSWERS[0]);

      expect(labeledRadios[1][PROPOSAL_TEXT]).to.equal('prop 2');
      expect(labeledRadios[1][BOOLEAN_ANSWER]).to.equal(DEFAULT_ANSWERS[1]);

      expect(labeledRadios[2][PROPOSAL_TEXT]).to.equal('prop 3');
      expect(labeledRadios[2][BOOLEAN_ANSWER]).to.equal(DEFAULT_ANSWERS[2]);
    });

    it('should return an array of [<proposal_text>, <boolean_answer>] with as many items than challenge proposals', function() {
      // given
      proposals = '- prop 1\n- prop 2\n- prop 3\n- prop 4\n- prop 5';
      initComponent.call(this);

      // when
      const labeledRadios = component.get('labeledRadios');

      // then
      expect(labeledRadios).to.have.lengthOf(5);
    });

    it('should return an array of [<proposal_text>, <boolean_answer>] with all <boolean_answer> values set to "false" when given answer is "null"', function() {
      // given
      answersValue = null;
      initComponent.call(this);

      // when
      const labeledRadios = component.get('labeledRadios');

      // then
      expect(_.every(labeledRadios, (labeledRadio) => labeledRadio[1] === false)).to.be.true;
    });

    it('should return an array of [<proposal_text>, <boolean_answer>] with <boolean_answer> values empty when answer value is not a boolean', function() {
      // given
      answersValue = [true, undefined, null];
      initComponent.call(this);

      // when
      const labeledRadios = component.get('labeledRadios');

      // then
      expect(labeledRadios).to.have.lengthOf(0);
    });

  });

});
