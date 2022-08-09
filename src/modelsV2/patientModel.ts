import db from '../db/db';
import { Patient, PatientWithoutId } from '../domain/Patient';

class PatientModel {
  public static table = 'patient';
  public static allColumnsArray = [
    'id',
    'firstName',
    'secondName',
    'birthDate',
    'ethnicity',
    'gender',
    'email',
    'addressState',
    'addressCity',
    'addressStreet',
    'paymentMethod',
    'insuranceProvider',
  ];

  public static async getAllPatients() {
    const patients = await db(this.table).select();
    return patients;
  }

  public static async getPatient(id: number): Promise<Patient> {
    const patient = await db(this.table).where('id', id).first();
    return patient;
  }

  public static async createPatient(patient: PatientWithoutId): Promise<Patient[]> {
    try {
      const addedpatient = await db(this.table).insert(patient, this.allColumnsArray);
      return addedpatient;
    } catch (e: any) {
      console.log('got error: ', e.detail);
      return e.detail;
    }
  }

  public static async updatePatient(patient: Patient): Promise<Patient[]> {
    const updatedpatient = await db(this.table).where('id', patient.id).update(patient, this.allColumnsArray);
    console.log('input=', patient, 'outptut=', updatedpatient);
    return updatedpatient;
  }

  public static async deletePatient(id: number): Promise<Patient[]> {
    const deletedpatient = await db(this.table).where('id', id).del(this.allColumnsArray);

    const patients = await db(this.table).select();
    console.log('after deletion', deletedpatient); 
    return patients;
  }
}

export default PatientModel;
