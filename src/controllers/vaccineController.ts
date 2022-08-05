// basically controller= promise handler
import { NextFunction, Request, Response } from 'express';
import logger from '../misc/logger';
import * as VaccineService from '../services/vaccineService';
export const getAllVaccines = (req: Request, res: Response, next: NextFunction) => {
  VaccineService.getAllVaccines().then((data) => res.json(data));
};

export const getVaccine = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.vaccineId;
  console.log('req.params==', req.params);
  console.log('id===', id);
  VaccineService.getVaccine(+id).then((data) => res.json(data));
};
export const createVaccine = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body==', req.body);
  const { siteLocation, serviceName, startDate, endDate, doseType, gender, age, ethinicity } = req.body;
  console.log('{email,siteLocation,...}==', {
    siteLocation,
    serviceName,
    startDate,
    endDate,
    doseType,
    gender,
    age,
    ethinicity,
  });
  VaccineService.createVaccine({
    siteLocation,
    serviceName,
    startDate,
    endDate,
    doseType,
    gender,
    age: +age,
    ethinicity,
  }).then((data) => res.json(data));
};
export const updateVaccine = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body==', req.body);
  const { siteLocation, serviceName, startDate, endDate, doseType, gender, age, ethinicity } = req.body;
  const { vaccineId } = req.params;
  VaccineService.updateVaccine({
    id: +vaccineId,
    siteLocation,
    serviceName,
    startDate,
    endDate,
    doseType,
    gender,
    age,
    ethinicity,
  }).then((data) => res.json(data));
};

export const deleteVaccine = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body==', req.body);
  const { vaccineId } = req.params;
  if (!vaccineId) {
    logger.error('date missing');
  }
  VaccineService.deleteVaccine(+vaccineId).then((data) => res.json(data));
};
