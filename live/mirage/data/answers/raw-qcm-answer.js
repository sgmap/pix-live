import challenge from '../challenges/raw-qcm-challenge';

export default {
  data: {
    type: 'answers',
    id: 'raw_answer_qcm_id',
    attributes: {
      value: '',
      result: 'ok'
    },
    relationships: {
      challenge: {
        data: {
          type: 'challenges',
          id: challenge.data.id
        }
      },
      assessment: {
        data: {
          type: 'assessments',
          id: 'ref_assessment_id'
        }
      }
    }
  }
};

