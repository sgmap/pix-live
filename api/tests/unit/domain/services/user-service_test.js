const { describe, it, expect, beforeEach, afterEach, sinon } = require('../../../test-helper');
const userRepository = require('../../../../lib/infrastructure/repositories/user-repository');
const assessmentRepository = require('../../../../lib/infrastructure/repositories/assessment-repository');
const challengeRepository = require('../../../../lib/infrastructure/repositories/challenge-repository');
const answerRepository = require('../../../../lib/infrastructure/repositories/answer-repository');
const competenceRepository = require('../../../../lib/infrastructure/repositories/competence-repository');
const userService = require('../../../../lib/domain/services/user-service');
const { UserNotFoundError } = require('../../../../lib/domain/errors');

const Answer = require('../../../../lib/domain/models/data/answer');

describe('Unit | Service | User Service', () => {

  describe('#isUserExistingByEmail', () => {

    const email = 'shi@fu.me';

    beforeEach(() => {
      sinon.stub(userRepository, 'findByEmail');
    });

    afterEach(() => {
      userRepository.findByEmail.restore();
    });

    it('should call a userRepository#findByEmail', () => {
      // given
      userRepository.findByEmail.resolves();

      // when
      const promise = userService.isUserExistingByEmail(email);

      // then
      return promise.then(() => {
        sinon.assert.calledOnce(userRepository.findByEmail);
        sinon.assert.calledWith(userRepository.findByEmail, email);
      });
    });

    it('should return true, when user is found', () => {
      // given
      const foundUser = {};
      userRepository.findByEmail.resolves(foundUser);

      // when
      const promise = userService.isUserExistingByEmail(email);

      // then
      return promise.then((result) => {
        expect(result).to.equal(true);
      });
    });

    it('should throw an error, when no user found', () => {
      // given
      userRepository.findByEmail.rejects();

      // when
      const promise = userService.isUserExistingByEmail(email);

      // then
      return promise.catch((result) => {
        expect(result).to.be.an.instanceOf(UserNotFoundError);
      });
    });
  });

  describe('#isUserExistingById', () => {

    const userId = 4367;

    beforeEach(() => {
      sinon.stub(userRepository, 'findUserById');
    });

    afterEach(() => {
      userRepository.findUserById.restore();
    });

    it('should call a userRepository.findUserById', () => {
      // given
      userRepository.findUserById.resolves();

      // when
      const promise = userService.isUserExistingById(userId);

      // then
      return promise.then(() => {
        sinon.assert.calledOnce(userRepository.findUserById);
        sinon.assert.calledWith(userRepository.findUserById, userId);
      });
    });

    it('should return true, when user is found', () => {
      // given
      const foundUser = {};
      userRepository.findUserById.resolves(foundUser);

      // when
      const promise = userService.isUserExistingById(userId);

      // then
      return promise.then((result) => {
        expect(result).to.equal(true);
      });
    });

    it('should throw an error, when no user found', () => {
      // given
      userRepository.findUserById.rejects();

      // when
      const promise = userService.isUserExistingById(userId);

      // then
      return promise.catch((result) => {
        expect(result).to.be.an.instanceOf(UserNotFoundError);
      });
    });
  });

  describe('#getSkillProfile', () => {

    let sandbox;
    const userId = 63731;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();

      sandbox.stub(assessmentRepository, 'findCompletedAssessmentsByUserId').resolves([
        { id: 13 }, { id: 1637 }
      ]);
      sandbox.stub(challengeRepository, 'list').resolves([
        {
          'id': 'challengeRecordIdOne',
          'knowledgeTags': ['@recherche4'],
          'competence': 'competenceRecordIdOne',
        },
        {
          'id': 'challengeRecordIdTwo',
          'knowledgeTags': ['@remplir2'],
          'competence': 'competenceRecordIdTwo',
        },
        {
          'id': 'challengeRecordIdThree',
          'knowledgeTags': ['@collaborer4'],
          'competence': 'competenceRecordIdThatDoesNotExistAnymore',
          'attachments': []
        }

      ]);
      sandbox.stub(answerRepository, 'findByAssessment').resolves([]);
      sandbox.stub(competenceRepository, 'list').resolves([
        {
          id: 'competenceRecordIdOne',
          name: '1.1 Construire un flipper',
        },
        {
          id: 'competenceRecordIdTwo',
          name: '1.2 Adopter un dauphin',
        }]);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should load achieved assessments', () => {
      // When
      const promise = userService.getSkillProfile(userId);

      // Then
      return promise.then(() => {
        sinon.assert.calledOnce(assessmentRepository.findCompletedAssessmentsByUserId);
        sinon.assert.calledWith(assessmentRepository.findCompletedAssessmentsByUserId, userId);
      });
    });

    it('should list available challenges', () => {
      // When
      const promise = userService.getSkillProfile(userId);

      // Then
      return promise.then(() => {
        sinon.assert.calledOnce(challengeRepository.list);
      });
    });

    it('should list answers for every assessment fulfilled', () => {
      // When
      const promise = userService.getSkillProfile(userId);

      // Then
      return promise.then(() => {
        sinon.assert.calledTwice(answerRepository.findByAssessment);
      });
    });

    it('should list available competences', () => {
      // When
      const promise = userService.getSkillProfile(userId);

      // Then
      return promise.then(() => {
        sinon.assert.calledOnce(competenceRepository.list);
      });
    });

    context('when all informations needed are collected', () => {

      it('should group the skills by competence', () => {
        // Given
        const answer = new Answer({ challengeId: 'challengeRecordIdTwo', result: 'ok' });

        answerRepository.findByAssessment.withArgs(13).resolves([]);
        answerRepository.findByAssessment.withArgs(1637).resolves([answer]);

        // When
        const promise = userService.getSkillProfile(userId);

        // Then
        return promise.then((skillProfile) => {
          expect(skillProfile).to.deep.equal([
            {
              id: 'competenceRecordIdOne',
              name: '1.1 Construire un flipper',
              skills: []
            },
            {
              id: 'competenceRecordIdTwo',
              name: '1.2 Adopter un dauphin',
              skills: ['@remplir2']
            }]);
        });
      });

      it('should not add a skill twice', () => {
        // Given
        const answer = new Answer({ challengeId: 'challengeRecordIdTwo', result: 'ok' });

        answerRepository.findByAssessment.withArgs(13).resolves([]);
        answerRepository.findByAssessment.withArgs(1637).resolves([answer, answer]);

        // When
        const promise = userService.getSkillProfile(userId);

        // Then
        return promise.then((skillProfile) => {
          expect(skillProfile).to.deep.equal([
            {
              id: 'competenceRecordIdOne',
              name: '1.1 Construire un flipper',
              skills: []
            },
            {
              id: 'competenceRecordIdTwo',
              name: '1.2 Adopter un dauphin',
              skills: ['@remplir2']
            }]);
        });
      });

      it('should not use a wrong answer', () => {
        // Given
        const answer = new Answer({ challengeId: 'challengeRecordIdTwo', result: 'ko' });

        answerRepository.findByAssessment.withArgs(13).resolves([]);
        answerRepository.findByAssessment.withArgs(1637).resolves([answer, answer]);

        // When
        const promise = userService.getSkillProfile(userId);

        // Then
        return promise.then((skillProfile) => {
          expect(skillProfile).to.deep.equal([
            {
              id: 'competenceRecordIdOne',
              name: '1.1 Construire un flipper',
              skills: []
            },
            {
              id: 'competenceRecordIdTwo',
              name: '1.2 Adopter un dauphin',
              skills: []
            }]);
        });
      });


      it('when the challenge id is not found', () => {
        // Given
        const answer = new Answer({ challengeId: 'challengeRecordIdThatDoesNotExist', result: 'ok' });

        answerRepository.findByAssessment.withArgs(13).resolves([]);
        answerRepository.findByAssessment.withArgs(1637).resolves([answer]);

        // When
        const promise = userService.getSkillProfile(userId);

        // Then
        return promise.then((skillProfile) => {
          expect(skillProfile).to.deep.equal([
            {
              id: 'competenceRecordIdOne',
              name: '1.1 Construire un flipper',
              skills: []
            },
            {
              id: 'competenceRecordIdTwo',
              name: '1.2 Adopter un dauphin',
              skills: []
            }]);
        });
      });

      it('when the competence is not found', () => {
        // Given
        const answer = new Answer({ challengeId: 'challengeRecordIdThree', result: 'ok' });

        answerRepository.findByAssessment.withArgs(13).resolves([]);
        answerRepository.findByAssessment.withArgs(1637).resolves([answer]);

        // When
        const promise = userService.getSkillProfile(userId);

        // Then
        return promise.then((skillProfile) => {
          expect(skillProfile).to.deep.equal([
            {
              id: 'competenceRecordIdOne',
              name: '1.1 Construire un flipper',
              skills: []
            },
            {
              id: 'competenceRecordIdTwo',
              name: '1.2 Adopter un dauphin',
              skills: []
            }]);
        });
      });

    });
  });

});
