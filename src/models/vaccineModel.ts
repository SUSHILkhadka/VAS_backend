import db from "../db/db";
import IVaccine, { IVaccineToInsert } from "../domain/IVaccine";

class VaccineModel {
  public static table = "vaccine";
  public static allColumnsArray = [
    "id",
    "serviceName",
    "siteLocation",
    "startDate",
    "endDate",
    "doseType",
    "gender",
    "age",
    "ethinicity",
  ];

  public static async getAllVaccines(): Promise<IVaccine[]> {
    const vaccines = await db(this.table).select();
    return vaccines;
  }

  public static async getVaccine(id: number): Promise<IVaccine> {
    const vaccine = await db(this.table).where("id", id).first();
    return vaccine;
  }

  public static async createVaccine(
    Vaccine: IVaccineToInsert
  ): Promise<IVaccine[]> {
    const addedVaccine = await db(this.table).insert(Vaccine).returning("*");
    return addedVaccine;
  }

  public static async updateVaccine(Vaccine: IVaccine): Promise<IVaccine> {
    const updatedVaccine = await db(this.table)
      .where("id", Vaccine.id)
      .update(Vaccine)
      .returning("*");
    return updatedVaccine[0];
  }

  public static async deleteVaccine(id: number): Promise<IVaccine> {
    const deletedVaccine = await db(this.table)
      .where("id", id)
      .del()
      .returning("*");
    return deletedVaccine[0];
  }
}

export default VaccineModel;
