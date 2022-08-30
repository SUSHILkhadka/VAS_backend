import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import IRequestWithTokenData from "../domain/IRequestWithTokenData";
import RequestWithTokenData from "../domain/IRequestWithTokenData";
import CustomError from "../misc/CustomError";
import * as AppointmentService from "../services/appointmentService";

export const getAllAppointments = (
  req: RequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  if (req.isAdmin) {
    AppointmentService.getAllAppointments().then((data) => res.json(data));
  } else if (req.email) {
    AppointmentService.getAllAppointmentsByEmail(req.email).then((data) =>
      res.json(data)
    );
  } else {
    return next(new CustomError("not authorized", StatusCodes.UNAUTHORIZED));
  }
};

export const createAppointment = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime } =
    req.body;

  AppointmentService.createAppointment({
    email: req.isAdmin ? email : req.email,
    siteLocation,
    serviceName,
    firstDoseDate,
    firstDoseTime,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateAppointment = (
  req: RequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime } =
    req.body;
  const { appointmentId } = req.params;
  if (req.isAdmin && !appointmentId) {
    return next(new CustomError("id in url missing", StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin)
    AppointmentService.updateAppointment({
      id: appointmentId,
      email,
      siteLocation,
      serviceName,
      firstDoseDate,
      firstDoseTime,
    })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else if (req.email) {
    AppointmentService.updateAppointmentByTokenEmail({
      id: appointmentId,
      email: req.email,
      siteLocation,
      serviceName,
      firstDoseDate,
      firstDoseTime,
    })
      .then((data) => res.json(data))
      .catch((err) => next(err));
  } else {
    return next(new CustomError("invalid request", StatusCodes.BAD_REQUEST));
  }
};

export const deleteAppointment = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { appointmentId } = req.params;
  if (req.isAdmin && !appointmentId) {
    return next(new CustomError("id in url missing", StatusCodes.BAD_REQUEST));
  }
  if (req.isAdmin)
    AppointmentService.deleteAppointment(+appointmentId)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else if (req.email)
    AppointmentService.deleteAppointmentByTokenEmail(+appointmentId, req.email)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else return next(new CustomError("invalid request", StatusCodes.BAD_REQUEST));
};
