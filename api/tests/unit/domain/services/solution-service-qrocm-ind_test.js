const { describe, it, expect } = require('../../../test-helper');

const service = require('../../../../lib/domain/services/solution-service-qrocm-ind');

describe('Unit | Service | SolutionServiceQROCM-ind ', function () {

  describe('#_applyTreatmentsToSolutions(solutions, enabledTreatments)', function () {

    it('', function () {
      // given
      const solutions = { '3lettres': ['OUI', 'NON   '], '4lettres': ['Good', 'Bad'] };
      const expected = { '3lettres': ['oui', 'non'], '4lettres': ['good', 'bad'] };
      const enabledTreatments = ['t1', 't2'];
      // when
      const actual = service._applyTreatmentsToSolutions(solutions, enabledTreatments);
      // then
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('#_applyTreatmentsToAnswers(answers, enabledTreatments)', function () {

    it('should be transformed in string', function () {
      // given
      const answers = { 'Num1': 1, 'Num2': 2 };
      const expected = { 'Num1': '1', 'Num2': '2' };
      const enabledTreatments = ['t1', 't2'];
      // when
      const actual = service._applyTreatmentsToAnswers(answers, enabledTreatments);
      // then
      expect(actual).to.deep.equal(expected);
    });

    it('should be transformed', function () {
      // given
      const answers = { 'Num1': 1, 'Num2': 2 };
      const expected = { 'Num1': '1', 'Num2': '2' };
      const enabledTreatments = [];
      // when
      const actual = service._applyTreatmentsToAnswers(answers, enabledTreatments);
      // then
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('#_compareAnswersAndSolutions', function () {

    it('should return results comparing answers and solutions strictly when T3 is disabled', function () {
      // given
      const answers = { 'Num1': '1', 'Num2': '3' };
      const solutions = { 'Num1': ['1', 'un', '01'], 'Num2': ['2', 'deux', '02'] };
      const allTreatmentsDisabled = [];

      // when
      const actual = service._compareAnswersAndSolutions(answers, solutions, allTreatmentsDisabled);

      // then
      const expected = { 'Num1': true, 'Num2': false };
      expect(actual).to.deep.equal(expected);
    });

    it('should return results comparing answers and solutions with Levenshtein ratio when T3 is enabled', function () {
      // given
      const answers = { 'phrase1': 'Le silence est d\'ours', 'phrase2': 'faceboo', 'phrase3': 'lasagne' };
      const solutions = { 'phrase1': ['Le silence est d\'or'], 'phrase2': ['facebook'], 'phrase3': ['engasal'] };
      const t3TreatmentEnabled = ['t3'];

      // when
      const actual = service._compareAnswersAndSolutions(answers, solutions, t3TreatmentEnabled);

      // then
      const expected = { 'phrase1': true, 'phrase2': true, 'phrase3': false };
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('#_formatResult', function () {

    it('should return "ko"', function () {
      // given
      const resultDetails = { 'phrase1': true, 'phrase2': false, 'phrase3': true };

      // when
      const actual = service._formatResult(resultDetails);

      // then
      expect(actual).to.equal('ko');
    });
    it('should return "ok"', function () {
      // given
      const resultDetails = { 'phrase1': true, 'phrase2': true, 'phrase3': true };

      // when
      const actual = service._formatResult(resultDetails);

      // then
      expect(actual).to.equal('ok');
    });
  });

  describe('Nominal and weird, combined cases', function () {

    const successfulCases = [{
      case: '(nominal case) Each answer strictly respect a corresponding solution',
      answer: '9lettres: courgette\n6lettres: tomate',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'solution contains numbers',
      answer: 'num1: 888\nnum2: 64',
      solution: 'num1:\n- 888\nnum2:\n- 64',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'leading/trailing spaces in solution',
      answer: '9lettres: c o u r g e t t e\n6lettres: t o m a t e',
      solution: '9lettres:\n-  courgette   \n6lettres:\n-   tomate    \n-   chicon    \n- legume   ',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'uppercases and leading/trailing spaces in solution',
      answer: '9lettres: c o u r g e t t e\n6lettres: t o m a t e',
      solution: '9lettres:\n-  COUrgETTE   \n6lettres:\n-   TOmaTE    \n-   CHICON    \n- LEGUME   ',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'spaces in answer',
      answer: '9lettres: c o u r g e t t e\n6lettres: t o m a t e',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'answer with levenshtein distance below 0.25',
      answer: '9lettres: ourgette\n6lettres: tomae',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'answer with uppercases',
      answer: '9lettres: COURGETTE\n6lettres: TOMATE',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'answer with uppercases and spaces',
      answer: '9lettres: C O U R G E T T E\n6lettres: T O M A T E',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'answer with uppercases spaces, and levenshtein > 0 but <= 0.25',
      answer: '9lettres: C O U G E T T E\n6lettres:  O M A T E',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'answer with uppercases spaces, and levenshtein > 0 but <= 0.25, and accents',
      answer: '9lettres: ç O u -- ;" ;--- _ \' grè TTÊ\n6lettres:  O M A T E',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'unbreakable spaces in answer',
      answer: '9lettres: c o u r g e t t e\n6lettres: t o m a t e',
      solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'Solution has spaces in-between',
      answer: '9lettres: abcdefg\n6lettres: ghjkl',
      solution: '9lettres:\n- a b c d e f g\n6lettres:\n- ghjklm\n- ghjklp\n- ghjklz',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: '(nominal case) Each answer strictly respect another corresponding solution',
      answer: '9lettres: patate\n6lettres: legume',
      solution: '9lettres:\n- courgette \n- patate\n6lettres:\n- tomate\n- chicon\n- legume',
      enabledTreatments : ['t1', 't2', 't3']
    }, {
      case: 'Each answer correctly match its solution, with worst levenshtein distance below or equal to 0.25',
      answer: '9lettres: abcd\n6lettres: ghjkl',
      solution: '9lettres:\n- abcde\n6lettres:\n- ghjklm\n- ghjklp\n- ghjklz',
      enabledTreatments : ['t1', 't2', 't3']
    }
    ];

    successfulCases.forEach(function (testCase) {
      it(testCase.case + ', should return "ok" when answer is "' + testCase.answer + '" and solution is "' + escape(testCase.solution) + '"', function () {
        expect(service.match(testCase.answer, testCase.solution, null, testCase.enabledTreatments)).to.equal('ok');
      });
    });

    const failingCases = [
      { case: 'solution do not exists', answer: 'any answer', enabledTreatments : ['t1', 't2', 't3'] },
      { case: 'solution is empty', answer: '', solution: '', enabledTreatments : ['t1', 't2', 't3'] },
      { case: 'answer is not a String', answer: new Date(), solution: '', enabledTreatments : ['t1', 't2', 't3'] },
      { case: 'solution is not a String', answer: 'a', solution: new Date(), enabledTreatments : ['t1', 't2', 't3'] },
      { case: 'solution has no separator \\n', answer: 'blabla', solution: 'blabla', enabledTreatments : ['t1', 't2', 't3'] },
      {
        case: 'Each answer points to the solution of another question',
        answer: '9lettres: tomate\n6lettres: courgette',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume',
        enabledTreatments : ['t1', 't2', 't3']
      },
      {
        case: 'One of the levenshtein distance is above 0.25',
        answer: '9lettres: abcde\n6lettres: ghjkl',
        //abcdefg below creates a levenshtein distance above 0.25
        solution: '9lettres:\n- abcdefg\n6lettres:\n- ghjklm\n- ghjklp\n- ghjklz',
        enabledTreatments : ['t1', 't2', 't3']
      },
      {
        case: 'All of the levenshtein distances are above 0.25',
        answer: '9lettres: abcde\n6lettres: ghjklpE11!!',
        solution: '9lettres:\n- abcdefg\n6lettres:\n- ghjklm\n- ghjklp\n- ghjklz',
        enabledTreatments : ['t1', 't2', 't3']
      }
    ];

    failingCases.forEach(function (testCase) {
      it(testCase.case + ', should return "ko" when answer is "' + testCase.answer + '" and solution is "' + escape(testCase.solution) + '"', function () {
        expect(service.match(testCase.answer, testCase.solution, null, testCase.enabledTreatments)).to.equal('ko');
      });
    });

  });

  describe('match, strong focus on treatments', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'reverted spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'reverted uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'reverted accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'reverted diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'reverted punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: {},
        enabledTreatments: ['t1', 't2', 't3']
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        const actual = service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments);
        expect(actual).to.equal(caze.output);
      });
    });
  });

  describe('match, t1 deactivated', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'reverted spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'reverted uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'reverted accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'reverted diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'reverted punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: { t1: true },
        enabledTreatments: ['t2', 't3']
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        expect(service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments)).to.equal(caze.output);
      });
    });
  });

  describe('match, t2 deactivated', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'reverted spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'reverted uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'reverted accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'reverted diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'reverted punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: { t2: true },
        enabledTreatments: ['t1', 't3']
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        expect(service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments)).to.equal(caze.output);
      });
    });
  });

  //Pour notre cas : enabledTreatments : ['t1', 't2']
  describe('match, t3 deactivated', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'reverted spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'reverted uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'reverted accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'reverted diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'reverted punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: { t3: true },
        enabledTreatments: ['t1', 't2']
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        expect(service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments)).to.equal(caze.output);
      });
    });
  });

  //Pour notre cas : enabledTreatments : ['t3']
  describe('match, t1 and t2 deactivated', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'reverted spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'reverted uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'reverted accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'reverted diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'reverted punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: { t1: true, t2: true },
        enabledTreatments: ['t3']
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        expect(service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments)).to.equal(caze.output);
      });
    });
  });

  //Pour notre cas : enabledTreatments : ['t2']
  describe('match, t1 and t3 deactivated', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'reverted spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'reverted uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'reverted accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'reverted diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'reverted punctuation stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: { t1: true, t3: true },
        enabledTreatments: ['t2']
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        expect(service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments)).to.equal(caze.output);
      });
    });
  });

  //Pour notre cas : enabledTreatments : ['t1']
  describe('match, t2 and t3 deactivated', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'reverted spaces stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'reverted uppercase stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'reverted accent stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'reverted diacritic stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'reverted punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: { t2: true, t3: true },
        enabledTreatments: ['t1']
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        expect(service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments)).to.equal(caze.output);
      });
    });
  });

  //Pour notre cas : enabledTreatments = []
  describe('match, t1, t2 and t3 deactivated', function () {

    const allCases = [
      {
        when: 'no stress',
        output: 'ok',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: c h i c o n',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'reverted spaces stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n-  c h i c o n \n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: CHICON',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- chicon\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'reverted uppercase stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: chicon',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- CHICON\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: îàéùô',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- iaeuo\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'reverted accent stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: iaeuo',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- îàéùô\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ççççç',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ccccc\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'reverted diacritic stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: ccccc',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- ççççç\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: .!p-u-n-c-t',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- punct\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'reverted punctuation stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: punct',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- .!p-u-n-c-t\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 0123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 123456789\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
      {
        when: 'reverted levenshtein stress',
        output: 'ko',
        answer: '9lettres: courgette\n6lettres: 123456789',
        solution: '9lettres:\n- courgette\n6lettres:\n- tomate\n- 0123456789\n- legume\n',
        deactivations: { t1: true, t2: true, t3: true },
        enabledTreatments: []
      },
    ];

    allCases.forEach(function (caze) {
      it(caze.when + ', should return ' + caze.output + ' when answer is "' + caze.answer + '" and solution is "' + escape(caze.solution) + '"', function () {
        expect(service.match(caze.answer, caze.solution, caze.deactivations, caze.enabledTreatments)).to.equal(caze.output);
      });
    });
  });

});

