import db from '../db/db';
import Appointment, { AppointmentWithoutId } from '../domain/Appointment';

class AppointmentModel {
  public static table = 'appointment';
  public static allColumnsArray = ['id', 'email', 'serviceName', 'siteLocation', 'firstDoseDate', 'firstDoseTime'];

  public static async getAllAppointments(): Promise<Appointment[]> {
    const appointments = await db(this.table).select();
    return appointments;
  }

  public static async getAppointment(id: number): Promise<Appointment> {
    const appointment = await db(this.table).where('id', id).first();
    // return JSON.parse(user);
    return appointment;
  }

  public static async createAppointment(appointment: AppointmentWithoutId): Promise<Appointment[]> {
    const addedAppointment = await db(this.table).insert(appointment, this.allColumnsArray);
    return addedAppointment;
  }

  public static async updateAppointment(appointment: Appointment): Promise<Appointment[]> {
    const updatedAppointment = await db(this.table)
      .where('id', appointment.id)
      .update(appointment, this.allColumnsArray);
    return updatedAppointment;
  }

  public static async deleteAppointment(id: number): Promise<Appointment[]> {
    const deletedAppointment = await db(this.table).where('id', id).del(this.allColumnsArray);
    const remainingAppointment = await db(this.table).select();
    console.log('after deletion', deletedAppointment);

    return remainingAppointment;
  }
}

export default AppointmentModel;
