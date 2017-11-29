import Component from '@ember/component';
import { computed } from '@ember/object';

const pendingValue = 'pending';
export default Component.extend({

  classNames: ['challenge-actions'],

  challengeSkipped: null, // action
  answerValidated: null, // action

  _validateButtonStatus: 'enable', // enable, pending, offline
  _skipButtonStatus: 'enable',
  isValidateButtonEnable: computed.equal('_validateButtonStatus', 'enable'),
  isValidateButtonPending: computed.equal('_validateButtonStatus', pendingValue),
  isValidateButtonOffline: computed.equal('_validateButtonStatus', 'offline'),

  isSkipButtonEnable: computed.equal('_skipButtonStatus', 'enable'),
  isSkipButtonPending: computed.equal('_skipButtonStatus', pendingValue),

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('_validateButtonStatus', 'enable');
    this.set('_skipButtonStatus', 'enable');
  },

  actions: {

    skipChallenge() {
      if(this.isValidateButtonEnable) {
        this.set('_skipButtonStatus', pendingValue);
        this.get('challengeSkipped')()
          .catch(() => this.set('_skipButtonStatus', 'enable'));
      }
    },

    validateAnswer() {
      if(this.isSkipButtonEnable) {
        this.set('_validateButtonStatus', pendingValue);
        this.get('answerValidated')()
          .catch(() => this.set('_validateButtonStatus', 'enable'));
      }
    }
  }

});
