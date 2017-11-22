const { describe, it, beforeEach, afterEach, expect, sinon } = require('../../../test-helper');
const airtable = require('../../../../lib/infrastructure/airtable');
const cache = require('../../../../lib/infrastructure/cache');
const challengeRepository = require('../../../../lib/infrastructure/repositories/challenge-repository');
const challengeSerializer = require('../../../../lib/infrastructure/serializers/airtable/challenge-serializer');

function _buildChallenge(id, instruction, proposals) {
  return { id, instruction, proposals };
}

function _buildChallengeWithCompetence(id, instruction, proposals, competence, status) {
  return { id, instruction, proposals, competence, status };
}

describe('Unit | Repository | challenge-repository', () => {

  let getRecord;
  let getRecords;

  beforeEach(() => {
    cache.flushAll();
    getRecord = sinon.stub(airtable, 'getRecord');
    getRecords = sinon.stub(airtable, 'getRecords');
  });

  afterEach(() => {
    cache.flushAll();
    getRecord.restore();
    getRecords.restore();
  });

  describe('#list', () => {

    const cacheKey = 'challenge-repository_list';
    const challenges = [
      _buildChallenge('challenge_id_1', 'Instruction #1', 'Proposals #1'),
      _buildChallenge('challenge_id_2', 'Instruction #2', 'Proposals #2'),
      _buildChallenge('challenge_id_3', 'Instruction #3', 'Proposals #3')
    ];

    it('should reject with an error when the cache throw an error', function(done) {
      // given
      const cacheErrorMessage = 'Cache error';
      sinon.stub(cache, 'get').callsFake((key, callback) => {
        callback(new Error(cacheErrorMessage));
      });

      // when
      const result = challengeRepository.list();

      // then
      cache.get.restore();
      expect(result).to.eventually.be.rejectedWith(cacheErrorMessage);
      done();
    });

    it('should resolve with the challenges directly retrieved from the cache without calling airtable when the challenge has been cached', function(done) {
      // given
      getRecords.resolves(true);
      cache.set(cacheKey, challenges);

      // when
      const result = challengeRepository.list();

      // then
      expect(getRecords.notCalled).to.be.true;
      expect(result).to.eventually.deep.equal(challenges);
      done();
    });

    describe('when challenges have not been previously cached', () => {

      beforeEach(() => {
        getRecords.resolves(challenges);
      });

      it('should resolve with the challenges fetched from airtable', function(done) {
        // when
        const result = challengeRepository.list();

        // then
        expect(result).to.eventually.deep.equal(challenges);
        done();
      });

      it('should cache the challenge fetched from airtable', function(done) {
        // when
        challengeRepository.list().then(() => {

          // then
          cache.get(cacheKey, (err, cachedValue) => {
            expect(cachedValue).to.exist;
            done();
          });
        });
      });

      it('should query correctly airtable', function(done) {
        // given
        const expectedQuery = {};

        // when
        challengeRepository.list().then(() => {

          // then
          expect(getRecords.calledWith('Epreuves', expectedQuery, challengeSerializer)).to.be.true;
          done();
        });
      });
    });

  });

  describe('#getFromCompetenceId', () => {

    const competenceId = 'competence_id';
    const cacheKey = `challenge-repository_get_from_competence_${competenceId}`;
    const challenges = [
      _buildChallengeWithCompetence('challenge_id_1', 'Instruction #1', 'Proposals #1', 'competence_id', 'validé'),
      _buildChallengeWithCompetence('challenge_id_2', 'Instruction #2', 'Proposals #2', 'other_competence_id', 'validé'),
      _buildChallengeWithCompetence('challenge_id_3', 'Instruction #3', 'Proposals #3', 'competence_id', 'validé')
    ];

    it('should reject with an error when the cache throws an error', function(done) {
      // given
      const cacheErrorMessage = 'Cache error';
      sinon.stub(cache, 'get').callsFake((key, callback) => {
        callback(new Error(cacheErrorMessage));
      });

      // when
      const result = challengeRepository.getFromCompetenceId(competenceId);

      // then
      cache.get.restore();
      expect(result).to.eventually.be.rejectedWith(cacheErrorMessage);
      done();
    });

    it('should resolve challenges directly retrieved from the cache without calling Airtable when the challenge has been cached', function(done) {
      // given
      getRecords.resolves(true);
      const expectedChallenges = [challenges[0], challenges[2]];
      cache.set(cacheKey, expectedChallenges);

      // when
      const result = challengeRepository.getFromCompetenceId(competenceId);

      // then
      expect(getRecords.notCalled).to.be.true;
      expect(result).to.eventually.deep.equal(expectedChallenges);
      done();
    });

    describe('when challenges have not been previously cached', () => {

      beforeEach(() => {
        getRecords.resolves(challenges);
      });

      it('should resolve with the challenges fetched from Airtable and filtered for this competence', function(done) {
        // when
        const result = challengeRepository.getFromCompetenceId(competenceId);

        // then
        const expectedChallenges = [challenges[0], challenges[2]];
        expect(result).to.eventually.deep.equal(expectedChallenges);
        done();
      });

      it('should cache the challenges fetched from Airtable', function(done) {
        // when
        challengeRepository.getFromCompetenceId(competenceId).then(() => {

          // then
          cache.get(cacheKey, (err, cachedValue) => {
            expect(cachedValue).to.exist;
            done();
          });
        });
      });

      it('should query correctly Airtable', function(done) {
        // given
        const expectedQuery = {};

        // when
        challengeRepository.getFromCompetenceId(competenceId).then(() => {

          // then
          expect(getRecords.calledWith('Epreuves', expectedQuery, challengeSerializer)).to.be.true;
          done();
        });
      });
    });

  });

  describe('#get', () => {

    const challengeId = 'challengeId';
    const cacheKey = `challenge-repository_get_${challengeId}`;
    const challenge = { foo: 'bar' };

    it('should resolve with the challenge directly retrieved from the cache without calling airtable when the challenge has been cached', () => {
      // given
      getRecord.resolves(true);
      cache.set(cacheKey, challenge);

      // when
      const result = challengeRepository.get(challengeId);

      // then
      expect(getRecord.notCalled).to.be.true;
      return expect(result).to.eventually.deep.equal(challenge);
    });

    it('should reject with an error when the cache throw an error', () => {
      // given
      const cacheErrorMessage = 'Cache error';
      sinon.stub(cache, 'get').callsFake((key, callback) => {
        callback(new Error(cacheErrorMessage));
      });

      // when
      const result = challengeRepository.get(challengeId);

      // then
      cache.get.restore();
      return expect(result).to.eventually.be.rejectedWith(cacheErrorMessage);
    });

    describe('when the challenge was not previously cached', () => {

      beforeEach(() => {
        getRecord.resolves(challenge);
      });

      it('should resolve with the challenges fetched from airtable', function(done) {
        // when
        const result = challengeRepository.get(challengeId);

        // then
        expect(result).to.eventually.deep.equal(challenge);
        done();
      });

      it('should cache the challenge fetched from airtable', function(done) {
        // when
        challengeRepository.get(challengeId).then(() => {

          // then
          cache.get(cacheKey, (err, cachedValue) => {
            expect(cachedValue).to.exist;
            done();
          });
        });
      });

      it('should query correctly airtable', function(done) {
        // when
        challengeRepository.get(challengeId).then(() => {

          // then
          expect(getRecord.calledWith('Epreuves', challengeId, challengeSerializer)).to.be.true;
          done();
        });
      });
    });
  });

  describe('#refresh', () => {

    const challengeId = 'challenge_id';
    const cacheKey = `challenge-repository_get_${challengeId}`;

    it('should reject with an error when the cache throw an error', () => {
      // given
      const cacheErrorMessage = 'Cache error';
      sinon.stub(cache, 'del').callsFake((key, callback) => {
        callback(new Error(cacheErrorMessage));
      });

      // when
      const result = challengeRepository.refresh(challengeId);

      // then
      cache.del.restore();
      return expect(result).to.eventually.be.rejectedWith(cacheErrorMessage);
    });

    it('should resolve with the challenge fetched from airtable when the challenge was not previously cached', () => {
      // given
      const challenge = {
        id: challengeId,
        instruction: 'Challenge instruction',
        proposals: 'Challenge proposals'
      };
      getRecord.resolves(challenge);

      // when
      const result = challengeRepository.refresh(challengeId);

      // then
      return expect(result).to.eventually.deep.equal(challenge);
    });

    it('should replace the old challenge by the new one in cache', () => {
      // given
      const oldCourse = {
        id: challengeId,
        name: 'Old challenge',
        description: 'Old description of the challenge'
      };
      cache.set(cacheKey, oldCourse);
      const newCourse = {
        id: challengeId,
        name: 'New challenge',
        description: 'new description of the challenge'
      };
      getRecord.resolves(newCourse);

      // when
      challengeRepository.refresh(challengeId).then(() => {

        // then
        cache.get(cacheKey, (err, cachedValue) => {
          expect(cachedValue).to.deep.equal(newCourse);
        });
      });
    });
  });
});
