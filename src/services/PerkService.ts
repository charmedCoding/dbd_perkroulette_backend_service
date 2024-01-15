import { db } from "./DatabaseService"
import { Perk } from "../types/Perk"


export class PerkService {
	public async getAllPerks(): Promise<Perk[]> {
		try {
			
			return await db("perk").select("*")
		} catch (error) {
			throw Error(error)
		}
	}
}
	
