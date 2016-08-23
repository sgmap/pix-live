import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    const store = this.get('store');

    let assessment = store.createRecord('assessment');

    return store
      .findRecord('course', params.course_id)
      .then((course) => {
        assessment.set('course', course);
        return assessment.save();
      })
      .then((assessment) => {
        return assessment.get('challenges');
      });
  },

  afterModel(challenges) {
    let firstChallengeId = challenges.sortBy('number').get('firstObject').id;
    this.transitionTo('challenge-show', firstChallengeId);
  }

});
