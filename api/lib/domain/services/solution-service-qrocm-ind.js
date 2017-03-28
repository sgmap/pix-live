const jsYaml = require('js-yaml');
const levenshtein = require('fast-levenshtein');
const _ = require('../../infrastructure/utils/lodash-utils');
const utils = require('./solution-service-utils');
const deactivationsService = require('./deactivations-service');
const { t1, t2 } = require('./validation-treatments');

function _applyTreatmentsTo(string, enabledTreatments) {
  string = string.toString();
  if (enabledTreatments.includes('t1')) {
    string = t1(string);
  }
  if (enabledTreatments.includes('t2')) {
    string = t2(string);
  }
  return string;
}

function _applyTreatmentsToSolutions(solutions, enabledTreatments) {
  return _.forEach(solutions, (solution, solutionKey) => {
    solution.forEach((variant, variantIndex) => {
      solutions[solutionKey][variantIndex] = _applyTreatmentsTo(variant, enabledTreatments);
    });
  });
}
function _applyTreatmentsToAnswers(answers, enabledTreatments) {
  return _.forEach(answers, (answer, answerKey) => {
    answers[answerKey] = _applyTreatmentsTo(answer, enabledTreatments);
  });
}

function _areApproximatevelyEqualAccordingToLevenshteinDistanceRatio(answer, solutionVariants) {
  let smallestLevenshteinDistance = answer.length;
  solutionVariants.forEach((variant) => {
    const levenshteinDistance = levenshtein.get(answer, variant);
    smallestLevenshteinDistance = Math.min(smallestLevenshteinDistance, levenshteinDistance);
  });
  const ratio = smallestLevenshteinDistance / answer.length;
  return ratio <= 0.25;
}

function _compareAnswersAndSolutions(answers, solutions, enabledTreatments) {
  const results = {};
  _.map(answers, (answer, answerKey) => {
    const solutionVariants = solutions[answerKey];
    if (enabledTreatments.includes('t3')) {
      results[answerKey] = _areApproximatevelyEqualAccordingToLevenshteinDistanceRatio(answer, solutionVariants);
    } else {
      results[answerKey] = solutionVariants.includes(answer);
    }
  });
  return results;
}

function _formatResult(resultDetails) {
  let result = 'ok';
  _.forEach(resultDetails, resultDetail => {
    if (!resultDetail)
      result = 'ko';
  });
  return result;
}

module.exports = {

  _applyTreatmentsToSolutions,
  _applyTreatmentsToAnswers,
  _compareAnswersAndSolutions,
  _formatResult,

  match (yamlAnswer, yamlSolution, deactivations, enabledTreatments) {

    if (_.isNotString(yamlAnswer)
      || _.isNotString(yamlSolution)
      || _.isEmpty(yamlSolution)
      || !_.includes(yamlSolution, '\n')) {
      return 'ko';
    }

    // Pre-treatments
    const preTreatedAnswers = yamlAnswer.replace(/\u00A0/g, ' ');
    const preTreatedSolutions = yamlSolution.replace(/\u00A0/g, ' ');

    // Convert YAML to JSObject
    const answers = jsYaml.safeLoad(preTreatedAnswers);
    const solutions = jsYaml.safeLoad(preTreatedSolutions);

    // Treatments
    const treatedSolutions = _applyTreatmentsToSolutions(solutions, enabledTreatments);
    const treatedAnswers = _applyTreatmentsToAnswers(answers, enabledTreatments);

    // Comparison
    const resultDetails = _compareAnswersAndSolutions(treatedAnswers, treatedSolutions, enabledTreatments);

    // Restitution
    return _formatResult(resultDetails);
  }

};
