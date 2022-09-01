import db from '../db/db';
import { IPatient, IPatientToInsert } from '../domain/IPatient';

class PatientModel {
  public static table = 'patient';

  public static async getAllPatients() {
    const patients = await db(this.table).select().returning('*');
    return patients;
  }

  public static async getAllPatientsByEmail(email: string): Promise<IPatient[]> {
    const patients = await db(this.table).where('email', email).returning('*');
    return patients;
  }
  public static async getPatientById(id: number): Promise<IPatient> {
    const patient = await db(this.table).where('id', id).returning('*').first();
    return patient;
  }
  public static async createPatient(patient: IPatientToInsert): Promise<IPatient> {
    const addedpatient = await db(this.table).insert(patient).returning('*');
    return addedpatient[0];
  }

  public static async updatePatient(patient: IPatient): Promise<IPatient> {
    const updatedpatient = await db(this.table).where('id', patient.id).update(patient).returning('*');
    return updatedpatient[0];
  }
  public static async updatePatientByTokenEmail(patient: IPatient): Promise<IPatient> {
    const updatedPatient = await db(this.table)
      .where({ id: patient.id, email: patient.email })
      .update(patient)
      .returning('*');
    return updatedPatient[0];
  }

  public static async deletePatient(id: number): Promise<IPatient> {
    const deletedpatient = await db(this.table).where('id', id).del().returning('*');
    return deletedpatient[0];
  }
  public static async deletePatientByTokenEmail(id: number, email: string): Promise<IPatient> {
    const deletedPatient = await db(this.table).where({ id: id, email: email }).del().returning('*');
    return deletedPatient[0];
  }
}

export default PatientModel;
