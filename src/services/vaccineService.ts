import Success from '../domain/ISuccess';
import IVaccine, { IVaccineToInsert } from '../domain/IVaccine';
import logger from '../misc/logger';
import VaccineModel from '../models/vaccineModel';

export const getAllVaccines = async (): Promise<Success<IVaccine[]>> => {
  logger.info('getting all vaccines ');
  const vaccines = await VaccineModel.getAllVaccines();
  return {
    data: vaccines,
    message: 'all vaccines fetched successfully.',
  };
};
export const getVaccine = async (id: number): Promise<Success<IVaccine>> => {
  logger.info(`getting a vaccine by id=${id}`);
  let vaccine;
  try {
    vaccine = await VaccineModel.getVaccine(+id);
    if (vaccine)
      return {
        data: vaccine,
        message: 'specified vaccine by id fetched successfully.',
      };
  } catch {
    console.log('could not found vaccine by id');
  }
  return {
    message: 'specified vaccine by id was not found.',
  };
};

export const createVaccine = async (body: IVaccineToInsert): Promise<Success<IVaccine>> => {
  logger.info('adding a Vaccine by increasing id');
  const vaccine = await VaccineModel.createVaccine(body);
  logger.info('added a vaccine sucess');
  return {
    data: vaccine,
    message: 'vaccine created successfully.',
  };
};

export const updateVaccine = async (body: IVaccine): Promise<Success<IVaccine>> => {
  logger.info(`updating a Vaccine by  id=${body.id}`);
  const vaccine = await VaccineModel.updateVaccine(body);
  logger.info('updated a vaccine success');
  return {
    data: vaccine,
    message: 'Vaccine updated successfully.',
  };
};

export const deleteVaccine = async (id: number): Promise<Success<IVaccine>> => {
  logger.info(`deleting a vaccine by  id=${id}`);
  const vaccine = await VaccineModel.deleteVaccine(id);
  logger.info('deleted a vaccine sucess');
  return {
    data: vaccine,
    message: 'Vaccine deleted successfully.',
  };
};
