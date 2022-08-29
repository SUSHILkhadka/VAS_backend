// basically controller= promise handler
import { NextFunction, Request, Response } from 'express';
import logger from '../misc/logger';
import * as VaccineService from '../services/vaccineService';
export const getAllVaccines = (req: Request, res: Response, next: NextFunction) => {
  VaccineService.getAllVaccines().then((data) => res.json(data)).catch((err)=>next(err));
};

export const getVaccine = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.vaccineId;
  VaccineService.getVaccine(+id).then((data) => res.json(data)).catch((err)=>next(err));
};
export const createVaccine = (req: Request, res: Response, next: NextFunction) => {
  const { siteLocation, serviceName, startDate, endDate, doseType, gender, age, ethinicity } = req.body;
  VaccineService.createVaccine({
    siteLocation,
    serviceName,
    startDate,
    endDate,
    doseType,
    gender,
    age: +age,
    ethinicity,
  }).then((data) => res.json(data)).catch((err)=>next(err));
};
export const updateVaccine = (req: Request, res: Response, next: NextFunction) => {
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
  }).then((data) => res.json(data)).catch((err)=>next(err));
};

export const deleteVaccine = (req: Request, res: Response, next: NextFunction) => {
  const { vaccineId } = req.params;
  if (!vaccineId) {
    logger.error('date missing');
  }
  VaccineService.deleteVaccine(+vaccineId).then((data) => res.json(data)).catch((err)=>next(err));
};
