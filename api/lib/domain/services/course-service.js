const _ = require('lodash');
const courseRepository = require('../../../lib/infrastructure/repositories/course-repository');
const certificationCourseRepository = require('../../../lib/infrastructure/repositories/certification-course-repository');
const Course = require('../models/Course');
const { NotFoundError } = require('../../../lib/domain/errors');

module.exports = {

  getCourse(courseId) {

    if (_.startsWith(courseId, 'rec')) {
      return courseRepository.get(courseId)
        .then((airtableCourse) => {
          return new Course(airtableCourse);
        }).catch((err) => {
          if ('MODEL_ID_NOT_FOUND' === err.error.type || 'NOT_FOUND' === err.error) {
            return new NotFoundError();
          }
        });
    } else {
      return certificationCourseRepository.get(courseId)
        .then((certificationCourse) => {
          return new Course(certificationCourse);
        }).catch(() => {
          return new NotFoundError()
        });
    }

  }

};