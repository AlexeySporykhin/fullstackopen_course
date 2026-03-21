import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (patient: NewPatient): Patient => {  
  const id = uuid();
  console.log('id', id);
  const newPatient = {    
    id,
    ...patient
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};
