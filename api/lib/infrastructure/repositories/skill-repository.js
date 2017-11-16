const cache = require('../cache');
const challengeRepository = require('./challenge-repository');
const Skill = require('../../domain/models/data/skill');
const Bookshelf = require('../../infrastructure/bookshelf');

module.exports = {

  findByCompetence(competenceId) {
    const cacheKey = `skill-repository_find_by_competence_${competenceId}`;
    const cachedSkills = cache.get(cacheKey);

    if (cachedSkills) {
      return Promise.resolve(cachedSkills);
    }

    return challengeRepository.findByCompetence(competenceId)
      .then(challenges => {
        const skills = new Set();
        _(challenges)
          .without((challenge) => _.isNil(challenge.skills))
          .forEach((challenge) => _.forEach(challenge.skills, (skill) => skills.add(skill)));
        cache.set(cacheKey, skills);
        return skills;
      });
  },

  save(arraySkills) {
    const SkillCollection = Bookshelf.Collection.extend({
      model: Skill
    });
    return SkillCollection.forge(arraySkills)
      .invokeThen('save');
  }
};
