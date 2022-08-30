import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('patient', (table) => {
    table.increments('id');
    table.string('firstName');
    table.string('secondName');
    table.string('birthDate');
    table.string('ethnicity');
    table.string('gender');
    table.string('email');
    table.string('addressState');
    table.string('addressCity');
    table.string('addressStreet');
    table.string('paymentMethod');
    table.string('insuranceProvider');
    table.string('photoUrl');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('patient');
}
