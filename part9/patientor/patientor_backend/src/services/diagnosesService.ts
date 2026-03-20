import diagnonsesData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnonsesData;
};

export default {
  getDiagnoses
};