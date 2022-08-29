import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import IRequestWithTokenData from "../domain/IRequestWithTokenData";
import RequestWithTokenData from "../domain/IRequestWithTokenData";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import * as AppointmentService from "../services/appointmentService";

export const getAllAppointments = (
  req: RequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  // if (req.isAdmin) {
    AppointmentService.getAllAppointments().then((data) => res.json(data));
  // } else {
  //   return next(new CustomError("not authorized", StatusCodes.UNAUTHORIZED));
  // }
};

export const getAppointment = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.AppointmentId;
  if (req.isAdmin)
    AppointmentService.getAppointment(+id)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else if (req.userId)
    AppointmentService.getAppointment(+req.userId)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  else return next(new CustomError("bad request", StatusCodes.BAD_REQUEST));
};
export const createAppointment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.body==", req.body);
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime } =
    req.body;

  AppointmentService.createAppointment({
    email,
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
  console.log("req.body==", req.body);
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime } =
    req.body;
  const { appointmentId } = req.params;

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
};

export const deleteAppointment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.body==", req.body);
  const { appointmentId } = req.params;
  if (!appointmentId) {
    logger.error("date missing");
  }
  AppointmentService.deleteAppointment(+appointmentId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
