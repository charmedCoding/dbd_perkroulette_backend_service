import { Knex } from "knex"
import survivor_perks from "../../../utils/survivor_perks.json"

export async function seed(knex: Knex): Promise<void> {
	await knex("perk").insert(survivor_perks)
}
