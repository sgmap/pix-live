import Ember from 'ember';

const INPUT_VALIDATION_STATUS_MAP = {
  default: 'signup-textfield__input--default',
  error: 'signup-textfield__input--error',
  success: 'signup-textfield__input--success'
};

const ICON_TYPE_STATUS_MAP = {
  default: '',
  error: 'error',
  success: 'success'
};

const MESSAGE_VALIDATION_STATUS_MAP =  {
  default: 'signup-textfield__message--default',
  error: 'signup-textfield__message--error',
  success: 'signup-textfield__message--success'
};

const INPUT_CONTAINER_VALIDATION_STATUS_MAP =  {
  default: 'signup-textfield__input-container--default',
  error: 'signup-textfield__input-container--error',
  success: 'signup-textfield__input-container--success'
};

export default Ember.Component.extend({
  classNames: ['signup-textfield'],

  label: '',
  textfieldName: '',
  validationMessage: '',

  textfieldType: Ember.computed('textfieldName', function(){
    if (this.get('textfieldName') === 'password') {
      return 'password';
    }
    return 'text';
  }),

  hasIcon: Ember.computed('validationStatus', function(){
    return this.get('validationStatus') !== 'default';
  }),

  inputContainerStatusClass: Ember.computed('validationStatus', function(){
    const inputValidationStatus = this.get('validationStatus');
    return INPUT_CONTAINER_VALIDATION_STATUS_MAP[inputValidationStatus] || null;
  }),

  iconType: Ember.computed('validationStatus', function(){
    const inputValidationStatus = this.get('validationStatus');
    return ICON_TYPE_STATUS_MAP[inputValidationStatus] || '';
  }),

  inputValidationStatus: Ember.computed('validationStatus', function(){
    const inputValidationStatus = this.get('validationStatus');
    return INPUT_VALIDATION_STATUS_MAP[inputValidationStatus] || '';
  }),

  validationMessageClass: Ember.computed('validationStatus', function(){
    const inputValidationStatus = this.get('validationStatus');
    return MESSAGE_VALIDATION_STATUS_MAP[inputValidationStatus] || '';
  }),

  actions: {
    validate(){
      this.sendAction('validate', this.get('textfieldName'));
    }
  }
});
