import { IPatient, IPatientToInsert } from '../domain/IPatient';
import Success from '../domain/ISuccess';
import logger from '../misc/logger';
import PatientModel from '../models/patientModel';

export const getAllPatients = async (): Promise<Success<IPatient[]>> => {
  logger.info('getting all patients . In patientService');
  const patients = await PatientModel.getAllPatients();
  return {
    data: patients,
    message: 'all patients fetched successfully. In userService.',
  };
};
export const getPatient = async (id: number): Promise<Success<IPatient>> => {
  logger.info(`getting a patient by id=${id}. In userService`);
  let user;
  try {
    user = await PatientModel.getPatient(+id);
  } catch {
    console.log('not found');
    throw new Error('couldnot get patient')
  }
  return {
    data: user,
    message: 'specified patient by id fetched successfully. In userService.',
  };
};

export const createPatient = async (body: IPatientToInsert): Promise<Success<IPatient>> => {
  logger.info('adding a patient by increasing id. In patientService');
  const patient = await PatientModel.createPatient(body);
  logger.info('added a patient sucess. In patientService');
  return {
    data: patient,
    message: 'patient created successfully. In patientService.',
  };
};

export const updatePatient = async (patient: IPatient): Promise<Success<IPatient>> => {
  logger.info(`updating patient of id=${patient.id}. In userService`);
  const updatedList = await PatientModel.updatePatient(patient);
  logger.info('update a pateint . In patientService');
  return {
    data: updatedList,
    message: 'Patient updated successfully. In patientService.',
  };
};
export const deletePatient = async (id: number): Promise<Success<IPatient>> => {
  logger.info(`deleting patient of id=${id}. In userService`);
  const updatedList = await PatientModel.deletePatient(id);

  logger.info('deleted a patient . In userService');
  return {
    data: updatedList,
    message: 'User deleted successfully.Above is remaining data. In userService.',
  };
};
