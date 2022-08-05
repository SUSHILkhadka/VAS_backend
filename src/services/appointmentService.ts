import Success from '../domain/Success';
import logger from '../misc/logger';
import Appointment, { AppointmentWithoutId } from '../domain/Appointment';
import AppointmentModel from '../modelsV2/appointmentModel';

export const getAllAppointments = async (): Promise<Success<Appointment[]>> => {
  logger.info('getting all appointments . In appointmentService');
  const apointments = await AppointmentModel.getAllAppointments();

  return {
    data: apointments,
    message: 'all appointments fetched successfully. In appointmentService.',
  };
};
export const getAppointment = async (id: number): Promise<Success<Appointment>> => {
  logger.info(`getting a appointment by id=${id}. In appointmentService`);
  let apointment;
  try {
    apointment = await AppointmentModel.getAppointment(+id);
  } catch {
    console.log('not found');
  }

  return {
    data: apointment,
    message: 'specified appointment by id fetched successfully. In appointmentService.',
  };
};

export const createAppointment = async (body: AppointmentWithoutId): Promise<Success<Appointment>> => {
  logger.info('adding a appointment by increasing id. In appointmentService');
  const apointment = await AppointmentModel.createAppointment(body);
  logger.info('added a Appointment sucess. In appointmentService');
  return {
    data: apointment,
    message: 'Appointment created successfully. In appointmentService.',
  };
};

export const updateAppointment = async (body: Appointment): Promise<Success<Appointment>> => {
  logger.info(`updating a appointment by  id=${body.id}. In appointmentService`);
  const appointment = await AppointmentModel.updateAppointment(body);
  logger.info('updated a Appointment sucess. In appointmentService');
  return {
    data: appointment,
    message: 'Appointment updated successfully. In appointmentService.',
  };
};

export const deleteAppointment = async (id: number): Promise<Success<Appointment>> => {
  logger.info(`deleting a appointment by  id=${id}. In appointmentService`);
  const appointment = await AppointmentModel.deleteAppointment(id);
  logger.info('deleted a Appointment sucess. In appointmentService');
  return {
    data: appointment,
    message: 'Appointment deleted successfully. In appointmentService.',
  };
};
