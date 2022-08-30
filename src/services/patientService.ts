import { IPatient, IPatientToInsert } from "../domain/IPatient";
import Success from "../domain/ISuccess";
import logger from "../misc/logger";
import PatientModel from "../models/patientModel";

export const getAllPatients = async (): Promise<Success<IPatient[]>> => {
  logger.info("getting all patients . In patientService");
  const patients = await PatientModel.getAllPatients();
  return {
    data: patients,
    message: "all patients fetched successfully. In userService.",
  };
};

export const getAllPatientsByEmail = async (
  email: string
): Promise<Success<IPatient[]>> => {
  logger.info("getting all patientsByEmail.");
  const patients = await PatientModel.getAllPatientsByEmail(email);
  return {
    data: patients,
    message: "all patientsByEmail fetched successfully.",
  };
};

export const createPatient = async (
  body: IPatientToInsert
): Promise<Success<IPatient>> => {
  logger.info("adding a patient by increasing id. In patientService");
  const patient = await PatientModel.createPatient(body);
  logger.info("added a patient sucess. In patientService");
  return {
    data: patient,
    message: "patient created successfully. In patientService.",
  };
};

export const updatePatient = async (
  patient: IPatient
): Promise<Success<IPatient>> => {
  logger.info(`updating patient of id=${patient.id}. In userService`);
  const updatedList = await PatientModel.updatePatient(patient);
  logger.info("update a pateint . In patientService");
  return {
    data: updatedList,
    message: "Patient updated successfully. In patientService.",
  };
};

export const updatePatientByTokenEmail = async (
  body: IPatient
): Promise<Success<IPatient>> => {
  logger.info("updating patientByTokenEmail with of appointmentId=" + body.id);
  const patient = await PatientModel.updatePatientByTokenEmail(body);
  logger.info("updated a patientByTokenEmail success.");
  return {
    data: patient,
    message: "Patient updated successfully..",
  };
};
export const deletePatient = async (id: number): Promise<Success<IPatient>> => {
  logger.info(`deleting patient of id=${id}. In userService`);
  const updatedList = await PatientModel.deletePatient(id);

  logger.info("deleted a patient . In userService");
  return {
    data: updatedList,
    message:
      "User deleted successfully.Above is remaining data. In userService.",
  };
};

export const deletePatientByTokenEmail = async (
  id: number,
  email: string
): Promise<Success<IPatient>> => {
  logger.info(
    "deleting patientByTokenEmail with of appointmentId=" +
      id +
      " and of email=" +
      email
  );
  const patient = await PatientModel.deletePatientByTokenEmail(id, email);
  logger.info("deleted a patient successfully.");
  return {
    data: patient,
    message: "patient deleted successfully.",
  };
};
