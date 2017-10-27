const Assessment = require('../../domain/models/data/assessment');
const { groupBy, map, head } = require('lodash');

function _selectLastAssessmentForEachCourse(assessments) {
  const assessmentsGroupedByCourse = groupBy(assessments.models, (assessment) => assessment.get('courseId'));
  return map(assessmentsGroupedByCourse, head);
}

module.exports = {

  get(id) {
    return Assessment
      .where('id', id)
      .fetch({ withRelated: ['answers'] });
  },

  findLastAssessmentsForEachCoursesByUser(userId) {
    return Assessment
      .collection()
      .query(qb => {
        qb.select()
          .where({ userId })
          .orderBy('createdAt', 'desc');
      })
      .fetch()
      .then((assessments) => {
        // XXX This kind of filter can be done with SQL but request differs according the database (PG, SQLite)
        // we don't succeed to write the request with Bookshelf/knex
        return _selectLastAssessmentForEachCourse(assessments);
      });

  },

  getByUserIdAndAssessmentId(assessmentId, userId) {
    return Assessment
      .query({ where: { id: assessmentId }, andWhere: { userId } })
      .fetch({ require: true });
  }
};
