import Success from '../domain/Success';
import logger from '../misc/logger';
import { Patient, PatientWithoutId } from '../domain/Patient';
import PatientModel from '../modelsV2/patientModel';

export const getAllPatients = async (): Promise<Success<Patient[]>> => {
  logger.info('getting all patients . In patientService');
  const patients = await PatientModel.getAllPatients();

  return {
    data: patients,
    message: 'all patients fetched successfully. In userService.',
  };
};
export const getPatient = async (id: number): Promise<Success<Patient>> => {
  logger.info(`getting a patient by id=${id}. In userService`);
  let user;
  try {
    // user = await userModel.getUser(+id);
    user = await PatientModel.getPatient(+id);
  } catch {
    console.log('not found');
  }

  return {
    data: user,
    message: 'specified patient by id fetched successfully. In userService.',
  };
};

export const createPatient = async (body: PatientWithoutId): Promise<Success<Patient>> => {
  logger.info('adding a patient by increasing id. In patientService');
  const patient = await PatientModel.createPatient(body);
  logger.info('added a patient sucess. In patientService');
  return {
    data: patient,
    message: 'patient created successfully. In patientService.',
  };
};

export const updatePatient = async (patient: Patient): Promise<Success<Patient[]>> => {
  logger.info(`updating patient of id=${patient.id}. In userService`);
  //   const updatedList = await userModel.updateUser(user);
  const updatedList = await PatientModel.updatePatient(patient);
  logger.info('update a pateint . In patientService');
  return {
    data: updatedList,
    message: 'Patient updated successfully. In patientService.',
  };
};
export const deletePatient = async (id: number): Promise<Success<Patient[]>> => {
  logger.info(`deleting patient of id=${id}. In userService`);
  //   const updatedList = await userModel.deleteUser(id);
  const updatedList = await PatientModel.deletePatient(id);

  logger.info('deleted a patient . In userService');
  return {
    data: updatedList,
    message: 'User deleted successfully.Above is remaining data. In userService.',
  };
};
