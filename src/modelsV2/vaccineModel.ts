import db from '../db/db';
import Vaccine, { VaccineWithoutId } from '../domain/Vaccine';

class VaccineModel {
  public static table = 'vaccine';
  public static allColumnsArray = [
    'id',
    'serviceName',
    'siteLocation',
    'startDate',
    'endDate',
    'doseType',
    'gender',
    'age',
    'ethinicity',
  ];

  public static async getAllVaccines(): Promise<Vaccine[]> {
    const vaccines = await db(this.table).select();
    return vaccines;
  }

  public static async getVaccine(id: number): Promise<Vaccine> {
    const vaccine = await db(this.table).where('id', id).first();
    // return JSON.parse(user);
    return vaccine;
  }

  public static async createVaccine(Vaccine: VaccineWithoutId): Promise<Vaccine[]> {
    const addedVaccine = await db(this.table).insert(Vaccine, this.allColumnsArray);
    return addedVaccine;
  }

  public static async updateVaccine(Vaccine: Vaccine): Promise<Vaccine[]> {
    const updatedVaccine = await db(this.table).where('id', Vaccine.id).update(Vaccine, this.allColumnsArray);
    return updatedVaccine;
  }

  public static async deleteVaccine(id: number): Promise<Vaccine[]> {
    const deletedVaccine = await db(this.table).where('id', id).del(this.allColumnsArray);
    const remainingVaccine = await db(this.table).select();
    console.log('after deletion', deletedVaccine);

    return remainingVaccine;
  }
}

export default VaccineModel;
