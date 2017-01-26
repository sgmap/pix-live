import Ember from 'ember';
import ModalRouteMixin from 'ember-routable-modal/mixins/route';
import RSVP from 'rsvp';

export default Ember.Route.extend(ModalRouteMixin, {

  _urlForSolution: function (adapter, assessmentId, answerId) {
    return adapter.buildURL('assessment', assessmentId) + '/solutions/' + answerId;
  },

  model(params) {
    const store = this.get('store');

    const assessmentId = params.assessment_id;
    const answerId = params.answer_id;

    return store.findRecord('answer', answerId).then((answer) => {
      return store.findRecord('challenge', answer.get('challenge.id')).then((challenge) => {
        return store.queryRecord('solution', {assessmentId, answerId}).then(function(solution) {
          return RSVP.hash({
            answer,
            challenge,
            solution
          });
        });
      });
    });

  },


});
