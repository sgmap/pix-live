const CourseController = require('./course-controller');
const accessSessionHandler = require('../../application/preHandlers/access-session');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/courses',
      config: {
        auth: false,
        handler: CourseController.list,
        tags: ['api'] }
    },
    {
      method: 'PUT',
      path: '/api/courses',
      config: { handler: CourseController.refreshAll, tags: ['api'] }
    },  {
      method: 'GET',
      path: '/api/courses/{id}',
      config: {
        auth: false,
        handler: CourseController.get,
        tags: ['api']
      }
    }, {
      method: 'POST',
      path: '/api/courses/{id}',
      config: { handler: CourseController.refresh, tags: ['api'] }
    }, {
      method: 'POST',
      path: '/api/courses',
      config: {
        pre: [{
          method: accessSessionHandler.sessionIsOpened,
          assign: 'sessionOpened'
        }],
        handler: CourseController.save,
        tags: ['api']
      }
    }
  ]);

  return next();
};

exports.register.attributes = {
  name: 'courses-api',
  version: '1.0.0'
};
