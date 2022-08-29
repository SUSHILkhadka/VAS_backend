import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("refresh_token",(table)=>{
        table.increments('id');
        table.string('refreshToken').notNullable();
        table.string('userId').notNullable();
        table.string('expiresAt').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('refresh_token');
}

