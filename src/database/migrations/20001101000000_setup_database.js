// This is just an example of a migration file, create a new one instead of editing this one to avoid problems!

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createSchema("application").createTable("perk", (table) => {
		table.increments("id")
		table.string("name", 50).notNullable()
		table.text("description").nullable()
		table.string("character", 25).nullable()
		table.string("img_url")
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
