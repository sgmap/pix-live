const { describe, it, expect, before, after, knex, sinon } = require('../../../test-helper');

const assessmentRepository = require('../../../../lib/infrastructure/repositories/assessment-repository');
const Assessment = require('../../../../lib/domain/models/data/assessment');

describe('Unit | Repository | assessmentRepository', () => {

  describe('#findCompletedAssessmentsByUserId', () => {

    const JOHN = 2;
    const LAYLA = 3;
    const assessmentsInDb = [{
      id: 1,
      userId: JOHN,
      courseId: 'courseId',
      estimatedLevel: 1,
      pixScore: 10
    }, {
      id: 2,
      userId: LAYLA,
      courseId: 'courseId',
      estimatedLevel: 2,
      pixScore: 20
    }, {
      id: 3,
      userId: JOHN,
      courseId: 'courseId',
      estimatedLevel: 3,
      pixScore: 30
    }];

    before(() => {
      return knex('assessments').insert(assessmentsInDb);
    });

    after(() => {
      return knex('assessments').delete();
    });

    it('should return the list of assessments from JOHN', () => {
      // When
      const promise = assessmentRepository.findCompletedAssessmentsByUserId(JOHN);

      // Then
      return promise.then((assessments) => {
        expect(assessments).to.have.length(2);

        const firstId = assessments[0].id;
        expect(firstId).to.equal(1);

        const secondId = assessments[1].id;
        expect(secondId).to.equal(3);
      });
    });

    it('should throw an error if something went wrong', () => {
      //Given
      const error = new Error('Unable to fetch');
      const whereStub = sinon.stub(Assessment, 'where').returns({
        fetchAll: () => {
          return Promise.reject(error);
        }
      });

      // When
      const promise = assessmentRepository.findCompletedAssessmentsByUserId(JOHN);

      // Then
      whereStub.restore();
      return promise
        .catch((err) => {
          expect(err).to.equal(error);
        });

    });

  });
});
