const {describe, it, expect, sinon, beforeEach, afterEach} = require('../../../test-helper');
const profileService = require('../../../../lib/domain/services/profile-service');
const userRepository = require('../../../../lib/infrastructure/repositories/user-repository');
const competenceRepository = require('../../../../lib/infrastructure/repositories/competence-repository');
const areaRepository = require('../../../../lib/infrastructure/repositories/area-repository');
const courseRepository = require('../../../../lib/infrastructure/repositories/course-repository');
const assessmentRepository = require('../../../../lib/infrastructure/repositories/assessment-repository');
const faker = require('faker');

const Assessment = require('../../../../lib/domain/models/data/assessment');

describe('Unit | Service | Profil User Service', function() {

  const fakeUserRecord = {
    'first-name': faker.name.findName(),
    'last-name': faker.name.findName()
  };

  const fakeCompetenceRecords = [
    {
      id: 'competenceId1',
      name: '1.1 Mener une recherche d’information',
      areaId: 'areaId1',
    },
    {
      id: 'competenceId2',
      name: '1.2 Gérer des données',
      areaId: 'areaId2'
    }];

  const fakeAreaRecords = [
    {
      id: 'areaId1',
      name: 'Domaine 1'
    },
    {
      id: 'areaId2',
      name: 'Domaine 2'
    }
  ];

  const fakeAssessmentRecords = [new Assessment({
    id : 'assessmentId1',
    pixScore: 10,
    estimatedLevel: 1,
    courseId : 'courseId8'
  })];

  const fakeCoursesRecords = [{
    id : 'courseId8',
    nom : 'Test de positionnement 1.1',
    competences : ['competenceId1']
  }];

  describe('#getUser', () => {

    it('should exist', () => {
      expect(profileService.getByUserId).to.exist;
    });

    describe('Enhanced user', () => {

      let userStub;
      let competencesStub;
      let areasStub;
      let getAdaptiveCourseStub;
      let getAssessmentsByUserId;

      beforeEach(() => {
        userStub = sinon.stub(userRepository, 'findUserById').resolves(fakeUserRecord);
        competencesStub = sinon.stub(competenceRepository, 'list').resolves(fakeCompetenceRecords);
        areasStub = sinon.stub(areaRepository, 'list').resolves(fakeAreaRecords);
        getAdaptiveCourseStub = sinon.stub(courseRepository, 'getAdaptiveCourses').resolves(fakeCoursesRecords);
        getAssessmentsByUserId = sinon.stub(assessmentRepository, 'getByUserId').resolves(fakeAssessmentRecords);
      });

      afterEach(() => {
        userStub.restore();
        competencesStub.restore();
        areasStub.restore();
        getAdaptiveCourseStub.restore();
        getAssessmentsByUserId.restore();
      });

      it('should return a resolved promise', () => {
        // when
        const promise = profileService.getByUserId('user-id');
        // then
        return expect(promise).to.be.fulfilled;
      });

      it('should return an enhanced user with all competences and area', () => {
        // Given
        const expectedUser = {
          user: fakeUserRecord,
          competences: [
            {
              id: 'competenceId1',
              name: '1.1 Mener une recherche d’information',
              areaId: 'areaId1',
              level: 1,
              pixScore: 10
            },
            {
              id: 'competenceId2',
              name: '1.2 Gérer des données',
              areaId: 'areaId2',
              level: -1
            }],
          areas: fakeAreaRecords
        };

        // When
        const promise = profileService.getByUserId('user-id');
        // Then
        return promise.then((enhancedUser) => {
          expect(enhancedUser).to.deep.equal(expectedUser);
        });
      });

      it('should call course repository to get adaptive courses', function() {
        // given

        // When
        const promise = profileService.getByUserId('user-id');

        // Then
        return promise.then(() => {
          sinon.assert.called(getAdaptiveCourseStub);
        });
      });

      it('should call assessment repository to get all assessments from the current user', function() {
        // given

        // When
        const promise = profileService.getByUserId('user-id');

        // Then
        return promise.then(() => {
          sinon.assert.called(getAssessmentsByUserId);
          sinon.assert.calledWith(getAssessmentsByUserId, 'user-id');
        });
      });

    });

  });
});
