export default function () {
}

export function testConfig() {

  const PIX_API_ROOT = 'http://localhost:3000/api';

  const AIRTABLE_ROOT = 'https://api.airtable.com/v0';
  const AIRTABLE_DATABASE = 'appHAIFk9u1qqglhX';

  this.get(`${PIX_API_ROOT}/courses`, function (schema) {
    return schema.courseAirtables.all();
  });

  this.get(`${PIX_API_ROOT}/courses/:id`, function (schema, request) {
    return schema.courseAirtables.find(request.params.id);
  });

  this.get(`${PIX_API_ROOT}/challenges/:id`, function (schema, request) {
    return schema.challengeAirtables.find(request.params.id);
  });

  this.get(`${PIX_API_ROOT}/challenges/:id`, function (schema, request) {
    return schema.assessmentAirtables.find(request.params.id);
  });

  this.post(`${AIRTABLE_ROOT}/${AIRTABLE_DATABASE}/Evaluations`, function (schema) {
    return schema.assessmentAirtables.all();
  });

  this.post(`${AIRTABLE_ROOT}/${AIRTABLE_DATABASE}/Reponses`, function (schema) {
    return schema.answerAirtables.all();
  });

  this.get(`${AIRTABLE_ROOT}/${AIRTABLE_DATABASE}/Reponses/:id`, function (schema, request) {
    return schema.answerAirtables.find(request.params.id);
  });

}
