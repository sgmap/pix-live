/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const utils = require('./solution-service-utils');
const yaml = require('js-yaml');
const _ = require('../../utils/lodash-utils');

// We expect that parsing from airtable returns an Object
// whose all values are array, like this :
// { Google: [ 'Google', 'google.fr', 'Google Search' ], Yahoo: [ 'Yahoo', 'Yahoo Answer' ] }
function _isValidSolution(solution) {
  let result = false;
  if (_.isObject(solution)) {
    result = _.every(solution, function(item) {
      return _.isArray(item) && _.every(item, (e) => _.isString(e));
    });
  }
  return result;
}

module.exports = {

  match (yamlAnswer, yamlSolution, yamlScoring) {
    let result = 'ko';
    let answerMap = null;
    let solution = null;
    let scoring = null;

    try {
      answerMap = yaml.safeLoad(yamlAnswer);
      // answerMap is
      //{ num1: ' google.fr', num2: 'yahoo aNswer ' }

      solution = yaml.safeLoad(yamlSolution);
      // solution is
      // { Google: [ 'Google', 'google.fr', 'Google Search' ], Yahoo: [ 'Yahoo', 'Yahoo Answer' ] }

      scoring = yaml.safeLoad(yamlScoring);
      // scoring is
      // { 1: 'rechinfo1', 2: 'rechinfo2', 3: 'rechinfo3' }

      console.log('scoring- - - - - - - - - - - - - - - - - - - - ', scoring);

    } catch (e) { // Parse exceptions like script injection could happen. They are detected here.
      return 'ko';
    }

    if (!_isValidSolution(solution)) {
      return 'ko';
    }

    const possibleAnswers = {};
    _.each(solution, (answerList, solutionKey) => {
      _.each(answerList, (answer) => {
        possibleAnswers[answer] = solutionKey;
      });
    });
    // possibleAnswers is
    // { Google: 'Google','google.fr': 'Google','Google Search': 'Google',Yahoo: 'Yahoo','Yahoo Answer': 'Yahoo' }

    let scoredKeys = [];
    _.each(answerMap, (answer) => {
      _.each(possibleAnswers, (solutionKey, possibleAnswer) => {
        if(utils.fuzzyMatchingWithAnswers(answer, [possibleAnswer])) {
          scoredKeys.push(solutionKey);
        }
      });
    });
    // scoredKeys is
    // [ 'Google', 'Yahoo' ]

    // remove duplicates
    scoredKeys = _.uniq(scoredKeys);

    const numberOfUserAnswers = Object.keys(answerMap).length;
    const numberOfUniqueCorrectAnswers = scoredKeys.length;

    // if (scoring) {

    // } else {
    //   const minNumberOfAnswers = numberOfUserAnswers;
    //   const maxNumberOfAnswers = numberOfUserAnswers;
    // }

    if (_.isNotEmpty(scoring)) {
      console.log('23423', minGrade, maxGrade, scoring);

      const minGrade = _.min(Object.keys(scoring));
      const maxGrade = _.max(Object.keys(scoring));

      if(numberOfUniqueCorrectAnswers >= maxGrade) {
        result = 'ok';
      } else if(numberOfUniqueCorrectAnswers >= minGrade) {
        result = 'partially';
      }

    } else {
      console.log('44', minGrade, maxGrade, scoring);

      if (_(numberOfUniqueCorrectAnswers).isEqual(numberOfUserAnswers)) {
        result = 'ok';
      }
    }

    // if (_(numberOfUniqueCorrectAnswers).isEqual(maxNumberOfAnswers)) {
    //   result = 'ok';
    // } else if (numberOfUniqueCorrectAnswers >= minNumberOfAnswers) {
    //   result = 'partially';
    // } else {
    //   result = 'ko';
    // }
    return result;

  }

};
