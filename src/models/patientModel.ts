import db from '../db/db';
import { IPatient, IPatientToInsert } from '../domain/IPatient';

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

  public static async getPatient(id: number): Promise<IPatient> {
    const patient = await db(this.table).where('id', id).first();
    return patient;
  }

  public static async createPatient(patient: IPatientToInsert): Promise<IPatient> {
      const addedpatient = await db(this.table).insert(patient, this.allColumnsArray);
      return addedpatient[0];
 
  }

  public static async updatePatient(patient: IPatient): Promise<IPatient> {
    const updatedpatient = await db(this.table).where('id', patient.id).update(patient, this.allColumnsArray);
    console.log('input=', patient, 'outptut=', updatedpatient);
    return updatedpatient[0];
  }

  public static async deletePatient(id: number): Promise<IPatient> {
    const deletedpatient = await db(this.table).where('id', id).del(this.allColumnsArray);

    const patients = await db(this.table).select();
    console.log('after deletion', deletedpatient); 
    return patients[0];
  }
}

export default PatientModel;
