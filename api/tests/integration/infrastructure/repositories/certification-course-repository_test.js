const { expect, knex } = require('../../../test-helper');
const certificationCourseRepository = require('../../../../lib/infrastructure/repositories/certification-course-repository');
const { NotFoundError } = require('../../../../lib/domain/errors');
const CertificationCourse = require('../../../../lib/domain/models/CertificationCourse');

describe('Integration | Repository | Certification Course', function() {

  const associatedAssessment = {
    id: 7,
    courseId: 20,
    userId: 1
  };

  const certificationCourse = {
    id: 20,
    status: 'started',
    userId: 1,
    completedAt: null
  };

  const certificationChallenges = [
    {
      id: 1,
      courseId: 20,
      challengeId: 'recChallenge1'
    },
    {
      id: 2,
      courseId: 20,
      challengeId: 'recChallenge2'
    },
    {
      id: 3,
      courseId: 19,
      challengeId: 'recChallenge3'
    }
  ];

  describe('#updateStatus', () => {

    before(() => {
      return knex('certification-courses').delete();
    });

    beforeEach(() => {
      return knex('certification-courses').insert(certificationCourse);
    });

    afterEach(() => {
      return knex('certification-courses').delete();
    });

    it('should update status of the certificationCourse (and not completedAt if any date is passed)', () => {
      // when
      const promise = certificationCourseRepository.updateStatus('completed', 20);

      // then
      return promise.then(() => knex('certification-courses').first('id', 'status', 'completedAt'))
        .then((certificationCourse) => {
          expect(certificationCourse.status).to.equal('completed');
          expect(certificationCourse.completedAt).to.equal(null);
        });
    });

    it('should update status and completedAt of the certificationCourse if one date is passed', () => {
      // when
      const promise = certificationCourseRepository.updateStatus('completed', 20, '2018-01-01');

      // then
      return promise.then(() => knex('certification-courses').first('id', 'status', 'completedAt'))
        .then((certificationCourse) => {
          expect(certificationCourse.status).to.equal('completed');
          expect(certificationCourse.completedAt).to.equal('2018-01-01');
        });
    });
  });

  describe('#get', function() {

    beforeEach(() => {
      return Promise.all([
        knex('certification-courses').insert(certificationCourse),
        knex('assessments').insert(associatedAssessment),
        knex('certification-challenges').insert(certificationChallenges),
      ]);
    });

    afterEach(() => {
      return Promise.all([
        knex('certification-courses').delete(),
        knex('assessments').delete(),
        knex('certification-challenges').delete()
      ]);
    });

    context('When the certification course exists', () => {
      it('should retrieve associated assessment with the certification course', function() {
        // when
        const promise = certificationCourseRepository.get(20);

        // then
        return promise.then((certificationCourse) => {
          expect(certificationCourse.id).to.equal(20);
          expect(certificationCourse.status).to.equal('started');
          expect(certificationCourse.type).to.equal('CERTIFICATION');
          expect(certificationCourse.completedAt).to.equal(null);
          expect(certificationCourse.assessment.id).to.equal(7);
          expect(certificationCourse.challenges.length).to.equal(2);
        });
      });
    });

    context('When the certification course does not exist', () => {
      it('should retrieve a NotFoundError Error', function() {
        // when
        const promise = certificationCourseRepository.get(4);

        // then
        return expect(promise).to.be.rejectedWith(NotFoundError);
      });
    });

  });

  describe('#update', function() {

    const certificationCourse = {
      id: 1,
      status: 'rejected',
      firstName: 'Freezer',
      lastName: 'The all mighty',
      birthplace: 'Namek',
      birthdate: '24/10/1989',
      rejectionReason: 'Killed all citizens'
    };

    beforeEach(() => {
      return knex('certification-courses').insert(certificationCourse);
    });

    afterEach(() => {
      return knex('certification-courses').delete();
    });

    it('should insert in the certification course table', function() {
      // given
      const modifiedCertifcationCourse = {
        id: 1,
        status: 'completed',
        firstName: 'Freezer',
        lastName: 'The all mighty',
        birthplace: 'Namek',
        birthdate: '24/10/1989',
        rejectionReason: ''
      };

      // when
      const promise = certificationCourseRepository.update(modifiedCertifcationCourse);

      // then
      return promise.then(() => knex('certification-courses').where({ id: 1 }).first())
        .then((certificationCourseInDatabase) => {
          expect(certificationCourseInDatabase.status).to.equal('completed');
          expect(certificationCourseInDatabase.rejectionReason).to.equal('');
        });
    });

    it('should assert the certifacition course has been updated', function() {
      // given
      const modifiedCertifcationCourse = {
        id: 1,
        status: 'completed',
        firstName: 'Freezer',
        lastName: 'The all mighty',
        birthplace: 'Namek',
        birthdate: '24/10/1989',
        rejectionReason: ''
      };

      // when
      const promise = certificationCourseRepository.update(modifiedCertifcationCourse);

      // then
      return promise.then((certificationCourseUpdated) => {
        expect(certificationCourseUpdated).to.be.instanceOf(CertificationCourse);
        expect(certificationCourseUpdated.id).to.equal(1);
        expect(certificationCourseUpdated.status).to.equal('completed');
        expect(certificationCourseUpdated.firstName).to.equal('Freezer');
        expect(certificationCourseUpdated.lastName).to.equal('The all mighty');
        expect(certificationCourseUpdated.birthplace).to.equal('Namek');
        expect(certificationCourseUpdated.birthdate).to.equal('24/10/1989');
        expect(certificationCourseUpdated.rejectionReason).to.equal('');
      });
    });

    it('should return a NotFoundError when ID doesnt exist', function() {
      // given
      const modifiedCertifcationCourse = {
        id: 2,
        status: 'completed',
        firstName: 'Freezer',
        lastName: 'The all mighty',
        birthplace: 'Namek',
        birthdate: '24/10/1989',
        rejectionReason: ''
      };

      // when
      const promise = certificationCourseRepository.update(modifiedCertifcationCourse);

      // then
      return expect(promise).to.be.rejectedWith(NotFoundError);

    });

  });
});

