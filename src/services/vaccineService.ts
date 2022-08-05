import Success from '../domain/Success';
import Vaccine, { VaccineWithoutId } from '../domain/Vaccine';
import logger from '../misc/logger';
import VaccineModel from '../modelsV2/vaccineModel';

export const getAllVaccines = async (): Promise<Success<Vaccine[]>> => {
  logger.info('getting all vaccines . In vaccineService');
  const vaccines = await VaccineModel.getAllVaccines();

  return {
    data: vaccines,
    message: 'all vaccines fetched successfully. In vaccineService.',
  };
};
export const getVaccine = async (id: number): Promise<Success<Vaccine>> => {
  logger.info(`getting a vaccine by id=${id}. In vaccineService`);
  let vaccine;
  try {
    vaccine = await VaccineModel.getVaccine(+id);
    if (vaccine)
      return {
        data: vaccine,
        message: 'specified vaccine by id fetched successfully. In vaccineService.',
      };
  } catch {
    console.log('could not found vaccine by id');
  }
  return {
    message: 'specified vaccine by id was not found. In vaccineService.',
  };
};

export const createVaccine = async (body: VaccineWithoutId): Promise<Success<Vaccine>> => {
  logger.info('adding a Vaccine by increasing id. In VaccineService');
  const vaccine = await VaccineModel.createVaccine(body);
  logger.info('added a vaccine sucess. In vaccineService');
  return {
    data: vaccine,
    message: 'vaccine created successfully. In vaccineService.',
  };
};

export const updateVaccine = async (body: Vaccine): Promise<Success<Vaccine>> => {
  logger.info(`updating a Vaccine by  id=${body.id}. In VaccineService`);
  const vaccine = await VaccineModel.updateVaccine(body);
  logger.info('updated a vaccine sucess. In vaccineService');
  return {
    data: vaccine,
    message: 'Vaccine updated successfully. In vaccineService.',
  };
};

export const deleteVaccine = async (id: number): Promise<Success<Vaccine>> => {
  logger.info(`deleting a vaccine by  id=${id}. In vaccineService`);
  const vaccine = await VaccineModel.deleteVaccine(id);
  logger.info('deleted a vaccine sucess. In vaccineService');
  return {
    data: vaccine,
    message: 'Vaccine deleted successfully. In vaccineService.',
  };
};
