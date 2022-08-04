// basically controller= promise handler
import { NextFunction, Request, Response } from 'express';
import logger from '../misc/logger';
import * as AppointmentService from '../services/appointmentService';

export const getAllAppointments = (req: Request, res: Response, next: NextFunction) => {
  AppointmentService.getAllAppointments().then((data) => res.json(data));
};

export const getAppointment = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.AppointmentId;
  console.log('req.params==', req.params);
  console.log('id===', id);
  AppointmentService.getAppointment(+id).then((data) => res.json(data));
};
export const createAppointment = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body==', req.body);
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime } = req.body;
  console.log('{email,siteLocation,...}==', { email, siteLocation, serviceName, firstDoseDate, firstDoseTime });
  AppointmentService.createAppointment({ email, siteLocation, serviceName, firstDoseDate, firstDoseTime }).then(
    (data) => res.json(data)
  );
};
export const updateAppointment = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body==', req.body);
  const { email, siteLocation, serviceName, firstDoseDate, firstDoseTime } = req.body;
  const { appointmentId } = req.params;
  console.log('{email,siteLocation,...}==', {
    id: appointmentId,
    email,
    siteLocation,
    serviceName,
    firstDoseDate,
    firstDoseTime,
  });
  AppointmentService.updateAppointment({
    id: appointmentId,
    email,
    siteLocation,
    serviceName,
    firstDoseDate,
    firstDoseTime,
  }).then((data) => res.json(data));
};

export const deleteAppointment = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body==', req.body);
  const { appointmentId } = req.params;
  if (!appointmentId) {
    logger.error('date missing');
  }
  AppointmentService.deleteAppointment(+appointmentId).then((data) => res.json(data));
};
