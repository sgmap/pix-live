const courseRepository = require('../../infrastructure/repositories/course-repository');
const answerRepository = require('../../infrastructure/repositories/answer-repository');
const assessmentRepository = require('../../infrastructure/repositories/assessment-repository');
const challengeService = require('../../domain/services/challenge-service');
const challengeRepository = require('../../infrastructure/repositories/challenge-repository');

const assessmentUtils = require('./assessment-service-utils');
const _ = require('../../infrastructure/utils/lodash-utils');

const scoringCalculator = require('../../domain/services/scoring');

function _selectNextInAdaptiveMode(assessment) {

  return new Promise((resolve, reject) => {
    answerRepository.findByAssessment(assessment.get('id'))
      .then(answers => {
        const responsePattern = assessmentUtils.getResponsePattern(answers);
        return assessmentUtils.getNextChallengeFromScenarios(assessment.get('courseId'), responsePattern);
      })
      .then(resolve)
      .catch(reject);
  });
}


function _selectNextInNormalMode(currentChallengeId, challenges) {

  /*
   * example : - if challenges is ["1st_challenge", "2nd_challenge", "3rd_challenge", "4th_challenge"]
   *           - and currentChallengeId is "2nd_challenge"
   *
   *           nextChallengeId will be "3rd_challenge"
   */
  const nextChallengeId = _(challenges).elementAfter(currentChallengeId).value();
  return _.defaultTo(nextChallengeId, null); // result MUST be null if not found

}


function selectNextChallengeId(course, currentChallengeId, assessment) {

  return new Promise((resolve) => {

    const challenges = course.challenges;

    if (!currentChallengeId) { // no currentChallengeId means the test has not yet started
      return resolve(challenges[0]);
    }

    if (course.isAdaptive) {
      return resolve(_selectNextInAdaptiveMode(assessment));
    } else {
      return resolve(_selectNextInNormalMode(currentChallengeId, challenges));
    }
  });
}

function getScoredAssessment(assessmentId) {
  return new Promise((resolve) => {
    assessmentRepository
      .get(assessmentId)
      .then(assessment => {
        courseRepository
          .get(assessment.get('courseId'))
          .then(course => {
            const challengePromises = course.challenges.map(challengeId => challengeRepository.get(challengeId));

            Promise.all(challengePromises)
              .then(challenges => {
                const knowledgeData = challengeService.getKnowledgeData(challenges);

                answerRepository
                  .findByAssessment(assessment.get('id'))
                  .then(answers => {
                    const scoredAssessment = scoringCalculator.populateScore(assessment, answers, knowledgeData);

                    resolve(scoredAssessment);
                  });
              });
          });
      });
  });
}

function getAssessmentNextChallengeId(assessment, currentChallengeId) {

  return new Promise((resolve, reject) => {

    if (!assessment) {
      resolve(null);
    }

    if (!assessment.get('courseId')) {
      resolve(null);
    }

    if (_.startsWith(assessment.get('courseId'), 'null')) {
      resolve(null);
    }

    const courseId = assessment.get('courseId');
    courseRepository
      .get(courseId)
      .then((course) => resolve(selectNextChallengeId(course, currentChallengeId, assessment)))
      .catch((error) => reject(error));
  });
}

module.exports = {

  getAssessmentNextChallengeId,
  getScoredAssessment

};
