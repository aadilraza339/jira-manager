/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.hasTable("tickets").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("tickets", function (table) {
                table.increments('id').primary();
                table.string("number")
                table.string("name");
                table.text("description");
                table.string("reporter");
                table.string("status");
                table.string("dueDate");
            });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("tickets");
};
