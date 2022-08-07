import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('vaccine', (table) => {
    table.increments('id');
    table.string('serviceName');
    table.string('siteLocation');
    table.string('startDate');
    table.string('endDate');
    table.string('doseType');
    table.string('gender');
    table.string('age');
    table.string('ethinicity');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('vaccine');
}
