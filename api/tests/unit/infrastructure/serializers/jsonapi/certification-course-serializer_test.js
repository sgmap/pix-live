const { describe, it, expect } = require('../../../../test-helper');
const serializer = require('../../../../../lib/infrastructure/serializers/jsonapi/certification-course-serializer');
const Assessment = require('../../../../../lib/domain/models/data/assessment');
const CertificationCourse = require('../../../../../lib/domain/models/CertificationCourse');

describe('Unit | Serializer | JSONAPI | certification-course-serializer', function() {

  describe('#serialize()', function() {
    const certificationCourse = new CertificationCourse({
      id: 'certification_id',
      userId : 2
    });
    const assessment = new Assessment({
      'id': '2'
    });
    const jsonCertificationCourse = {
      data: {
        type: 'certification-courses',
        id: 'certification_id',
        attributes : {
          'user-id': '2'
        }
      }
    };

    const jsonCertificationCourseWithAssessment = {
      data: {
        type: 'certification-courses',
        id: 'certification_id',
        attributes : {
          'user-id': '2'
        },
        relationships: {
          assessment: {
            data: {
              id: '2',
              type: 'assessments'
            }
          }
        }
      }
    };
    it('should convert a Certification Course model object into JSON API data', function() {

      // when
      const json = serializer.serialize(certificationCourse);

      // then
      expect(json).to.deep.equal(jsonCertificationCourse);

    });

    it('should convert a Certification Course model with Assessment object into JSON API data', function() {

      // when
      const json = serializer.serialize({ id: certificationCourse.id, assessment: assessment });

      // then
      expect(json).to.deep.equal(jsonCertificationCourseWithAssessment);

    });

  });
});