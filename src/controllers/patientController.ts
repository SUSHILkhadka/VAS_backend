import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import RequestWithTokenData from "../domain/IRequestWithTokenData";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import * as patientService from "../services/patientService";

export const getAllPatients = (
  req: RequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  // if (req.isAdmin) {
    patientService.getAllPatients().then((data) => res.json(data)).catch((err)=>next(err));
  // } else if (!req.isAdmin && req.userId) {
  //   patientService.getPatient(+req.userId).then((data) => res.json(data)).catch((err)=>next(err));
  // } else {
  //   return next(new CustomError('getting all patient failed',StatusCodes.BAD_REQUEST))
  // }
};

export const getPatient = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.patientId;
  if(!id){
    return next(new CustomError("no patient id in url",StatusCodes.BAD_REQUEST))
  }
  patientService.getPatient(+id).then((data) => res.json(data)).catch((err)=>next(err));
};

export const createPatient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  console.log("{name,email,password}==", {
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
    .then((data) => res.json(data)).catch((err)=>next(err));
};

export const updatePatient = (
  req: RequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
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
  if (!patientId || !firstName || !email || (!req.isAdmin && req.userId)) {
    logger.error("data missing");
    next();
  }
  patientService
    .updatePatient({
      id: req.isAdmin?+patientId:(req.userId?req.userId:0),
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
    .then((data) => res.json(data)).catch((err)=>next(err));
};

export const deletePatient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { patientId } = req.params;

  if (!patientId) {
    logger.error("data missing");
  }
  patientService.deletePatient(+patientId).then((data) => res.json(data)).catch((err)=>next(err));
};
