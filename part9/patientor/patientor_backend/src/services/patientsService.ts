import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,  
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getNonSensitivePatients
};
