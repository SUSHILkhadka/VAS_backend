import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IRequestWithTokenData from '../domain/IRequestWithTokenData';
import RequestWithTokenData from '../domain/IRequestWithTokenData';
import CustomError from '../misc/CustomError';
import * as AppointmentService from '../services/appointmentService';

export const getAllAppointments = (req: RequestWithTokenData, res: Response, next: NextFunction) => {
  if (req.isAdmin) {
    AppointmentService.getAllAppointments()
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } else {
    return next(new CustomError('not authorized', StatusCodes.UNAUTHORIZED));
  }
};
export const getAllAppointmentsByPatientId = (req: Request, res: Response, next: NextFunction) => {
  const { patientId } = req.params;

  if (!patientId) {
    return next(new CustomError('patientId is required', StatusCodes.BAD_REQUEST));
  }

  AppointmentService.getAllAppointmentsByPatientId(+patientId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const createAppointment = (req: Request, res: Response, next: NextFunction) => {
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime, secondDoseDate, secondDoseTime, patientId } =
    req.body;

  AppointmentService.createAppointment({
    email: email,
    siteLocation,
    serviceName,
    firstDoseDate,
    firstDoseTime,
    secondDoseDate,
    secondDoseTime,
    patientId,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateAppointment = (req: RequestWithTokenData, res: Response, next: NextFunction) => {
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime, secondDoseDate, secondDoseTime, patientId } =
    req.body;
  const { appointmentId } = req.params;
  if (req.isAdmin && !appointmentId) {
    return next(new CustomError('id in url missing', StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin)
    AppointmentService.updateAppointment({
      id: appointmentId,
      email,
      siteLocation,
      serviceName,
      firstDoseDate,
      firstDoseTime,
      secondDoseDate,
      secondDoseTime,
      patientId,
    })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else {
    return next(new CustomError('not authorized', StatusCodes.UNAUTHORIZED));
  }
};

export const deleteAppointment = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { appointmentId } = req.params;
  if (req.isAdmin && !appointmentId) {
    return next(new CustomError('id in url missing', StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin)
    AppointmentService.deleteAppointment(+appointmentId)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else return next(new CustomError('not authorized', StatusCodes.UNAUTHORIZED));
};
