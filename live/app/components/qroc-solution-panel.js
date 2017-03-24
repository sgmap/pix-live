import Ember from 'ember';

const QrocSolutionPanel = Ember.Component.extend({

  answer: null,
  solution: null,

  isResultOk : Ember.computed('answer', function () {
    return this.get('answer.result') === 'ok';
  }),
  isResultKo : Ember.computed('answer', function () {
    return this.get('answer.result') === 'ko';
  }),
  isResultWithoutAnswer : Ember.computed('answer', function () {
    return this.get('answer.result') === 'aband';
  }),

  answerToDisplay: Ember.computed('answer', function () {
    const answer = this.get('answer.value');
    if (answer === '#ABAND#'){
      return 'Pas de réponse';
    }
    return answer;
  }),

  solutionToDisplay: Ember.computed('solution.value', function () {
    const solutionVariants = this.get('solution.value');
    if (!solutionVariants){
      return '';
    }

    const solutionVariantsArray = solutionVariants.split('\n');
    const solution = solutionVariantsArray[0];
    return solution;
  })
});

QrocSolutionPanel.reopenClass({
  positionalParams: ['answer', 'solution']
});

export default QrocSolutionPanel;
