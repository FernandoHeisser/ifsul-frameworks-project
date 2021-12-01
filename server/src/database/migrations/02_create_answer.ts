import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('answer', table => {
        
        table.increments('id')
            .primary();
        
        table.integer('questionId')
            .references('id')
            .inTable('question')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
            table.integer('userId')
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table.string('body')
            .notNullable();

        table.string('createDate')
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('answer');
}