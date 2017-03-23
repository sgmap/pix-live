const courseRepository = require('../../infrastructure/repositories/course-repository');
const answerRepository = require('../../infrastructure/repositories/answer-repository');
const assessmentUtils = require('./assessment-service-utils');
const _ = require('../../infrastructure/utils/lodash-utils');

function _selectNextInAdaptiveMode(assessment) {

  return new Promise((resolve, reject) => {

    answerRepository.findByAssessment(assessment.get('id'))
      .then(answers => {
        const responsePattern = assessmentUtils.getResponsePattern(answers);
        return assessmentUtils.getNextChallengeFromScenarios(responsePattern);
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


function _getDifficultyOfKnowledge(knowledgeTag) {

  return parseInt(knowledgeTag.slice(-1));
}

function _nextNode(node, direction) {

  return node.slice(0, -1) + (parseInt(node.slice(-1)) + direction);
}

function _propagateKnowledge(knowledgeList, startNode, direction) {

  const nodeList = [];
  let node = startNode;
  while(knowledgeList.hasOwnProperty(node)) {
    nodeList.push(node);
    node = _nextNode(node, direction);
  }
  return nodeList;
}

function _getPerformanceStats(answers, knowledgeData) {

  const acquiredKnowledgeTags = [];
  const notAcquiredKnowledgeTags = [];
  const performanceHistory = [];
  const nbAcquiredKnowledgeTagsByLevel = {};
  [1, 2, 3, 4, 5, 6, 7, 8].forEach(level => nbAcquiredKnowledgeTagsByLevel[level] = 0);
  _.forEach(answers, answer => {
    const challenge = knowledgeData.challengesById[answer.get('challengeId')];
    if (challenge) {
      const knowledgeTags = challenge.knowledgeTags;
      const mainKnowledgeTag = knowledgeTags[0];
      const difficulty = _getDifficultyOfKnowledge(mainKnowledgeTag);
      let outcome = 0;
      let direction = 1;
      let tagBucket = notAcquiredKnowledgeTags;
      if (answer.get('result') === 'ok') {
        outcome = 1;
        direction = -1;
        tagBucket = acquiredKnowledgeTags;
      }
      const relatedKnowledgeTags = _propagateKnowledge(knowledgeData.knowledgeTagSet, mainKnowledgeTag, direction);
      performanceHistory.push({difficulty, outcome});
      tagBucket.push(...relatedKnowledgeTags);
    }
  });
  acquiredKnowledgeTags.forEach(knowledgeTag => {
    const difficulty = _getDifficultyOfKnowledge(knowledgeTag);
    nbAcquiredKnowledgeTagsByLevel[difficulty]++;
  });
  return {
    acquiredKnowledgeTags,
    notAcquiredKnowledgeTags,
    performanceHistory,
    nbAcquiredKnowledgeTagsByLevel
  };
}

function _add(a, b) {
  return a + b;
}

function _computeDiagnosis(performanceStats, knowledgeData) {

  const firstFiveLevels = [1, 2, 3, 4, 5];
  let pixScore = 0;
  firstFiveLevels.forEach(level => {
    if (knowledgeData.nbKnowledgeTagsByLevel[level] > 0) {
      pixScore += performanceStats.nbAcquiredKnowledgeTagsByLevel[level] * 8 / knowledgeData.nbKnowledgeTagsByLevel[level];
    }
  });
  pixScore = Math.floor(pixScore);

  const nbAcquiredKnowledgeTags = firstFiveLevels.map(level => performanceStats.nbAcquiredKnowledgeTagsByLevel[level]).reduce(_add);
  const nbKnowledgeTags = firstFiveLevels.map(level => knowledgeData.nbKnowledgeTagsByLevel[level]).reduce(_add);

  const highestLevel = Math.max(...firstFiveLevels.filter(level => knowledgeData.nbKnowledgeTagsByLevel[level] > 0));
  const estimatedLevel = Math.floor(nbAcquiredKnowledgeTags * highestLevel / nbKnowledgeTags);
  return {
    estimatedLevel,
    pixScore
  };
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


module.exports = {

  _getDifficultyOfKnowledge,
  _nextNode,
  _propagateKnowledge,

  populateScore(assessment, answers, knowledgeData) {

    if (answers.length === 0) {
      return assessment;
    }

    const performanceStats = _getPerformanceStats(answers, knowledgeData);
    const diagnosis = _computeDiagnosis(performanceStats, knowledgeData);

    assessment.set('estimatedLevel', diagnosis.estimatedLevel);
    assessment.set('pixScore', diagnosis.pixScore);
    assessment.set('notAcquiredKnowledgeTags', performanceStats.notAcquiredKnowledgeTags);
    assessment.set('acquiredKnowledgeTags', performanceStats.acquiredKnowledgeTags);
    return assessment;
  },

  getAssessmentNextChallengeId(assessment, currentChallengeId) {

    return new Promise((resolve, reject) => {

      const courseId = assessment.get('courseId');
      courseRepository
      .get(courseId)
      .then((course) => resolve(selectNextChallengeId(course, currentChallengeId, assessment)))
      .catch((error) => reject(error));
    });
  }

};
