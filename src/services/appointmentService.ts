import IAppointment, { IAppointmentToInsert } from "../domain/IAppointment";
import Success from "../domain/ISuccess";
import logger from "../misc/logger";
import AppointmentModel from "../models/appointmentModel";

export const getAllAppointments = async (): Promise<
  Success<IAppointment[]>
> => {
  logger.info("getting all appointments.");
  const appointments = await AppointmentModel.getAllAppointments();

  return {
    data: appointments,
    message: "all appointments fetched successfull..",
  };
};

export const getAllAppointmentsByEmail = async (
  email: string
): Promise<Success<IAppointment[]>> => {
  logger.info("getting all appointmentsByEmail.");
  const appointments = await AppointmentModel.getAllAppointmentsByEmail(email);
  return {
    data: appointments,
    message: "all appointmentsByEmail fetched successfull..",
  };
};

export const createAppointment = async (
  body: IAppointmentToInsert
): Promise<Success<IAppointment>> => {
  logger.info("adding a appointment by with email = " + body.email);
  const apointment = await AppointmentModel.createAppointment(body);
  logger.info("added a Appointment sucessfully.");
  return {
    data: apointment,
    message: "Appointment created successfull..",
  };
};

export const updateAppointment = async (
  body: IAppointment
): Promise<Success<IAppointment>> => {
  logger.info(
    "updating appointmnent by admin with of appointmentId=" + body.id
  );
  const appointment = await AppointmentModel.updateAppointment(body);
  logger.info("updated a Appointment suces.");
  return {
    data: appointment,
    message: "Appointment updated successfull..",
  };
};

export const updateAppointmentByTokenEmail = async (
  body: IAppointment
): Promise<Success<IAppointment>> => {
  logger.info(
    "updating appointmnentByTokenEmail with of appointmentId=" + body.id
  );
  const appointment = await AppointmentModel.updateAppointmentByTokenEmail(
    body
  );
  logger.info("updated a appointmnentByTokenEmail success.");
  return {
    data: appointment,
    message: "Appointment updated successfully..",
  };
};

export const deleteAppointment = async (
  id: number
): Promise<Success<IAppointment>> => {
  logger.info("deleting appointmnentByTokenEmail with of appointmentId=" + id);
  const appointment = await AppointmentModel.deleteAppointment(id);
  logger.info("deleted a Appointment successfully.");
  return {
    data: appointment,
    message: "Appointment deleted successfully..",
  };
};

export const deleteAppointmentByTokenEmail = async (
  id: number,
  email: string
): Promise<Success<IAppointment>> => {
  logger.info(
    "deleting appointmnentByTokenEmail with of appointmentId=" +
      id +
      " and of email=" +
      email
  );
  const appointment = await AppointmentModel.deleteAppointmentByTokenEmail(
    id,
    email
  );
  logger.info("deleted a Appointment successfully.");
  return {
    data: appointment,
    message: "Appointment deleted successfully.",
  };
};
