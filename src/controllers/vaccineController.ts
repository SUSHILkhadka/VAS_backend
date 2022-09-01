import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IRequestWithTokenData from '../domain/IRequestWithTokenData';
import CustomError from '../misc/CustomError';
import * as VaccineService from '../services/vaccineService';
export const getAllVaccines = (req: Request, res: Response, next: NextFunction) => {
  VaccineService.getAllVaccines()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const createVaccine = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { siteLocation, serviceName, startDate, endDate, doseType, gender, age, ethinicity } = req.body;
  if (req.isAdmin)
    VaccineService.createVaccine({
      siteLocation,
      serviceName,
      startDate,
      endDate,
      doseType,
      gender,
      age: +age,
      ethinicity,
    })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else return next(new CustomError('unauthorized', StatusCodes.BAD_REQUEST));
};

export const updateVaccine = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { siteLocation, serviceName, startDate, endDate, doseType, gender, age, ethinicity } = req.body;
  const { vaccineId } = req.params;
  if (!vaccineId) {
    return next(new CustomError('id in url missing', StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin)
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
    })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else return next(new CustomError('unauthorized', StatusCodes.BAD_REQUEST));
};

export const deleteVaccine = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { vaccineId } = req.params;
  if (!vaccineId) {
    return next(new CustomError('id in url missing', StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin)
    VaccineService.deleteVaccine(+vaccineId)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else return next(new CustomError('unauthorized', StatusCodes.BAD_REQUEST));
};
