// basically controller= promise handler
import { NextFunction, Request, Response } from 'express';
import logger from '../misc/logger';
import * as patientService from '../services/patientService';

export const getAllPatients = (req: Request, res: Response, next: NextFunction) => {
  patientService.getAllPatients().then((data) => res.json(data));
};

export const getPatient = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.patientId;
  patientService.getPatient(+id).then((data) => res.json(data));
};

export const createPatient = (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName,
    secondName,
    birthDate,
    ethnicity,
    gender,
    email,
    addressState,
    addressCity,
    addressStreet,
    paymentMethod,
    insuranceProvider,
  } = req.body;
  console.log('{name,email,password}==', {
    firstName,
    secondName,
    birthDate,
    ethnicity,
    gender,
    email,
    addressState,
    addressCity,
    addressStreet,
    paymentMethod,
    insuranceProvider,
  });
  patientService
    .createPatient({
      firstName,
      secondName,
      birthDate,
      ethnicity,
      gender,
      email,
      addressState,
      addressCity,
      addressStreet,
      paymentMethod,
      insuranceProvider,
    })
    .then((data) => res.json(data));
};

export const updatePatient = (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName,
    secondName,
    birthDate,
    ethnicity,
    gender,
    email,
    addressState,
    addressCity,
    addressStreet,
    paymentMethod,
    insuranceProvider,
  } = req.body;
  const { patientId } = req.params;
  if (!patientId || !firstName || !email) {
    logger.error('data missing');
  }
  patientService
    .updatePatient({
      id: +patientId,
      firstName,
      secondName,
      birthDate,
      ethnicity,
      gender,
      email,
      addressState,
      addressCity,
      addressStreet,
      paymentMethod,
      insuranceProvider,
    })
    .then((data) => res.json(data));
};

export const deletePatient = (req: Request, res: Response, next: NextFunction) => {
  const { patientId } = req.params;

  if (!patientId) {
    logger.error('data missing');
  }
  patientService.deletePatient(+patientId).then((data) => res.json(data));
};
