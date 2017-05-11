import Ember from 'ember';

export default Ember.Component.extend({

  classNames : ['scoring-panel'],

  assessment: null,

  hasATrophy: Ember.computed.gt('assessment.estimatedLevel', 0),
  hasSomePix: Ember.computed.equal('assessment.pixScore', 0)

});
