const { expect, sinon } = require('../../../test-helper');
const sessionCodeService = require('../../../../lib/domain/services/session-code-service');
const sessionRepository = require('../../../../lib/infrastructure/repositories/session-repository');

describe('Unit | Service | CodeSession', () => {

  describe('#isSessionCodeAvailable', () => {

    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return a session code with 4 random capital letters and 2 random numbers', () => {
      // given
      sandbox.stub(sessionRepository, 'isSessionCodeAvailable').resolves(true);

      // when
      const promise = sessionCodeService.getNewSessionCode();

      // then
      return promise.then((result) => {
        expect(result).to.match(/[A-Z]{4}[0-9]{2}/);
      });
    });

    it('should call Repository isSessionCodeAvailable to validate code unicity', () => {
      // given
      sandbox.stub(sessionRepository, 'isSessionCodeAvailable').resolves(true);

      // when
      const promise = sessionCodeService.getNewSessionCode();

      // then
      return promise.then((result) => {
        sinon.assert.calledOnce(sessionRepository.isSessionCodeAvailable);
        sinon.assert.calledWith(sessionRepository.isSessionCodeAvailable, result);
      });
    });

    it('should call Repository isSessionCodeAvailable twice if first code was not unique', () => {
      // given
      const argumentsOfMockFunction = [];
      const isSessionCodeAvailableMockFunction = (codeToTest) => {
        argumentsOfMockFunction.push(codeToTest);
        return Promise.resolve(argumentsOfMockFunction.length === 2);
      };
      sandbox.stub(sessionRepository, 'isSessionCodeAvailable').callsFake(isSessionCodeAvailableMockFunction);

      // when
      const promise = sessionCodeService.getNewSessionCode();

      // then
      return promise.then((result) => {
        sinon.assert.calledTwice(sessionRepository.isSessionCodeAvailable);
        expect(argumentsOfMockFunction[0]).to.not.equal(result);
        expect(argumentsOfMockFunction[1]).to.equal(result);
      });
    });
  });
});
