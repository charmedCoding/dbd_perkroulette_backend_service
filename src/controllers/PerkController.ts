import {
	Controller,
	Get,
	Path,
	Patch,
	Post,
	Put,
	Route,
	Tags,
	Response,
	Body,
	Delete,
	SuccessResponse,
	Query,
} from "tsoa"
import { ConflictError, NotFoundError, UnauthorizedError } from "../utils/ErrorHandler"
import { generateRandomString } from "../utils/StringGenerator"
import { PerkService } from "../services/PerkService"
import { Perk } from "../types/Perk"

@Route("perks")
@Tags("Perk")
export class PerkController extends Controller {
	PerkService: PerkService = new PerkService()

	/**
	 *
	 * @summary Get all perks
	 */

	@Get("")
	@Response(500, "Internal Server Error")
	public async getAllPerks(): Promise<Perk[]> {
		return this.PerkService.getAllPerks()
	}

}