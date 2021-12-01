import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        
        table.increments('id')
            .primary();
        
        table.string('email')
            .notNullable()
            .unique();
        
        table.string('password')
            .notNullable();
        
        table.string('nickname')
            .notNullable()
            .unique();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user');
}