import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('appointment', (table) => {
    table.string('secondDoseDate');
    table.string('secondDoseTime');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('appointment', (table) => {
    table.dropColumn('secondDoseDate');
    table.dropColumn('secondDoseTime');
  });
}



