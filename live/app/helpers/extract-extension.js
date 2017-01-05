import Ember from 'ember';

export function extractExtension(params) {
  let parts = params[0].split('.');
  const lastIndex = parts.length - 1;
  return parts[lastIndex];
}

export default Ember.Helper.helper(extractExtension);
