const { expect, knex, generateValidRequestAuhorizationHeader } = require('../../test-helper');
const server = require('../../../server');
const Feedback = require('../../../lib/infrastructure/data/feedback');

describe('Acceptance | Controller | feedback-controller', () => {

  describe('POST /api/feedbacks', () => {

    afterEach(() => {
      return knex('feedbacks').delete();
    });

    const options = {
      method: 'POST',
      url: '/api/feedbacks',
      payload: {
        data: {
          type: 'feedbacks',
          attributes: {
            email: 'shi@fu.me',
            content: 'Some content'
          },
          relationships: {
            assessment: {
              data: {
                type: 'assessment',
                id: 'assessment_id'
              }
            },
            challenge: {
              data: {
                type: 'challenge',
                id: 'challenge_id'
              }
            }
          }
        }
      },
      headers: { authorization: generateValidRequestAuhorizationHeader() },
    };

    it('should return 201 HTTP status code', () => {
      // when
      const promise = server.inject(options);

      // then
      return promise.then((response) => {
        expect(response.statusCode).to.equal(201);
      });
    });

    it('should return application/json', () => {
      // when
      const promise = server.inject(options);

      // then
      return promise.then((response) => {
        const contentType = response.headers['content-type'];
        expect(contentType).to.contain('application/json');
      });
    });

    it('should add a new feedback into the database', () => {
      // when
      const promise = server.inject(options);

      // then
      return promise.then(() => {
        return Feedback.count().then((afterFeedbacksNumber) => {
          expect(afterFeedbacksNumber).to.equal(1);
        });
      });
    });

    it('should return persisted feedback', () => {
      // when
      const promise = server.inject(options);

      // then
      return promise.then((response) => {
        const feedback = response.result.data;
        return new Feedback()
          .fetch()
          .then((model) => {
            expect(model.id).to.be.a('number');
            expect(model.get('email')).to.equal(options.payload.data.attributes.email);
            expect(model.get('content')).to.equal(options.payload.data.attributes.content);
            expect(model.get('assessmentId')).to.equal(options.payload.data.relationships.assessment.data.id);
            expect(model.get('challengeId')).to.equal(options.payload.data.relationships.challenge.data.id);

            expect(feedback.id).to.equal(model.id);
            expect(feedback.id).to.equal(response.result.data.id);
            expect(feedback.attributes.content).to.equal(model.get('content'));
            expect(feedback.relationships.assessment.data.id).to.equal(model.get('assessmentId'));
            expect(feedback.relationships.challenge.data.id).to.equal(model.get('challengeId'));
          });
      });
    });
  });
});
