const Scenario = require('../../domain/models/data/scenario');

function getResponsePattern(answers) {
  return answers.map(answer => (answer.attributes.result === 'ok') ? 'ok' : 'ko').join('-');
}

function getNextChallengeFromScenarios(responsePattern) {
  return Scenario.where('path', responsePattern).orderBy('updatedAt', 'DESC').fetch()
    .then(scenario => {
      if (scenario && scenario.attributes.nextChallengeId !== 'null') {
        return scenario.attributes.nextChallengeId;
      } else {
        return null;
      }
    });
}

module.exports = {
  getResponsePattern,
  getNextChallengeFromScenarios
};
