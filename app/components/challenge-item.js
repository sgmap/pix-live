import Ember from 'ember';

export default Ember.Component.extend({

  /* inherited */
  tagName: 'article',
  classNames: ['challenge-item'],
  attributeBindings: ['challenge.id:data-challenge-id'],

  /* common */
  mode: 'live',
  challenge: null,
  isLiveMode: Ember.computed.equal('mode', 'live'),
  isCoursePreviewMode: Ember.computed.equal('mode', 'course-preview'),

  /* required properties when mode equals 'course-preview' */
  course: null,
  hasNextChallenge: Ember.computed('challenge', 'course', function () {
    const course = this.get('course');
    const challenge = this.get('challenge');
    const challenges = course.get('challenges');
    const currentChallengeIndex = challenges.indexOf(challenge);
    return currentChallengeIndex + 1 < challenges.get('length');
  }),
  nextChallenge: Ember.computed('challenge', 'course', function () {
    const course = this.get('course');
    const challenge = this.get('challenge');
    const challenges = course.get('challenges');
    return challenges.objectAt(challenges.indexOf(challenge) + 1);
  })

});
