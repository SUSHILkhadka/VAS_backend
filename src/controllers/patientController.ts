import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IRequestWithTokenData from '../domain/IRequestWithTokenData';
import RequestWithTokenData from '../domain/IRequestWithTokenData';
import CustomError from '../misc/CustomError';
import * as patientService from '../services/patientService';

export const getAllPatients = (req: RequestWithTokenData, res: Response, next: NextFunction) => {
  if (req.isAdmin) {
    patientService
      .getAllPatients()
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } else {
    return next(new CustomError('not authorized', StatusCodes.UNAUTHORIZED));
  }
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
    photoUrl,
  } = req.body;
  patientService
    .createPatient({
      firstName,
      secondName,
      birthDate,
      ethnicity,
      gender,
      email: email,
      addressState,
      addressCity,
      addressStreet,
      paymentMethod,
      insuranceProvider,
      photoUrl,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updatePatient = (req: RequestWithTokenData, res: Response, next: NextFunction) => {
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
    photoUrl,
  } = req.body;

  const { patientId } = req.params;
  if (!patientId || !firstName || !email || (!req.isAdmin && req.userId)) {
    return next(new CustomError('required data fields missing', StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin) {
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
        photoUrl,
      })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } else {
    return next(new CustomError('not authorized', StatusCodes.UNAUTHORIZED));
  }
};

export const deletePatient = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { patientId } = req.params;

  if (req.isAdmin && !patientId) {
    return next(new CustomError('id in url missing', StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin)
    patientService
      .deletePatient(+patientId)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else return next(new CustomError('not authorized', StatusCodes.UNAUTHORIZED));
};
