import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('appointment', (table) => {
    table.increments('id');
    table.string('email');
    table.string('serviceName');
    table.string('siteLocation');
    table.string('firstDoseDate');
    table.string('firstDoseTime');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('appointment');
}
