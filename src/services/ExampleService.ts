import { db } from "./DatabaseService"
import { Example } from "../types/Example"

export class ExampleService {
	public async getAllExamples(): Promise<Example[]> {
		try {
			
			return await db("example").select("*")
		} catch (error) {
			throw Error(error)
		}
	}

	public async getExample(id: number): Promise<Example> {
		try {
			return await db("example").where({ id: id }).first()
		} catch (error) {
			throw Error(error)
		}
	}

	public async createExample(example: Omit<Example, "id" | "public">): Promise<Example> {
		try {
			const createdExample: Example = await db("example").returning("*").insert(example)

			return createdExample[0]
		} catch (error) {
			throw Error(error)
		}
	}

	public async editExample(id: number, example: Omit<Example, "id" | "public" | "secret_phrase">): Promise<Example> {
		try {
			const editedExample: Example = await db("example").where({ id: id }).returning("*").update(example)

			return editedExample[0]
		} catch (error) {
			throw Error(error)
		}
	}

	public async removeExample(id: number) {
		try {
			return await db("example").where({ id: id }).delete()
		} catch (error) {
			throw Error(error)
		}
	}

	public async publishExample(id: number): Promise<Example> {
		try {
			const publishedExample: Example = await db("example")
				.where({ id: id })
				.returning("*")
				.update({ public: true })

			return publishedExample[0]
		} catch (error) {
			throw Error(error)
		}
	}
}
