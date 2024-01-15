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
import { ExampleService } from "../services/ExampleService"
import { Example } from "../types/Example"

@Route("examples")
@Tags("Example")
export class ExampleController extends Controller {
	ExampleService: ExampleService = new ExampleService()

	/**
	 *
	 * @summary Get all examples
	 */

	@Get("")
	@Response(500, "Internal Server Error")
	public async getAllExamples(): Promise<Example[]> {
		return this.ExampleService.getAllExamples()
	}

	/**
	 *
	 * @summary Get a specific example
	 */
	@Get("{id}")
	@Response(404, "Not Found")
	@Response(500, "Internal Server Error")
	public async getExample(@Path() id: number): Promise<Example> {
		const fetchedExample: Example = await this.ExampleService.getExample(id)

		if (!fetchedExample) {
			throw new NotFoundError()
		}

		return fetchedExample
	}

	/**
	 *
	 * @summary Create a new example
	 */
	@Post("")
	@Response(400, "Bad Request")
	@Response(422, "Unprocessable Entity")
	@Response(500, "Internal Server Error")
	@SuccessResponse(201, "Created")
	public async createExample(@Body() example: Omit<Example, "id" | "public" | "secret_phrase">): Promise<Example> {
		const fullExample: Omit<Example, "id" | "public"> = {
			...example,
			secret_phrase: generateRandomString(25),
		}

		const createdExample: Example = await this.ExampleService.createExample(fullExample)

		this.setStatus(201)
		return createdExample
	}

	/**
	 *
	 * @summary Edit a specific example
	 */
	@Put("{id}")
	@Response(400, "Bad Request")
	@Response(401, "Unauthorized")
	@Response(404, "Not Found")
	@Response(422, "Unprocessable Entity")
	@Response(500, "Internal Server Error")
	@SuccessResponse(200, "Updated")
	public async editExample(
		@Path() id: number,
		@Query() secretPhrase: string,
		@Body() example: Omit<Example, "id" | "public" | "secret_phrase">
	): Promise<Example> {
		const fetchedExample: Example = await this.ExampleService.getExample(id)

		if (!fetchedExample) {
			throw new NotFoundError()
		}

		if (fetchedExample.secret_phrase != secretPhrase) {
			throw new UnauthorizedError()
		}

		const editedExample: Example = await this.ExampleService.editExample(fetchedExample.id, example)

		return editedExample
	}

	/**
	 *
	 * @summary Delete a specific example
	 */
	@Delete("{id}")
	@Response(401, "Unauthorized")
	@Response(404, "Not Found")
	@Response(409, "Conflict")
	@Response(500, "Internal Server Error")
	@SuccessResponse(204, "Deleted")
	public async removeExample(@Path() id: number, @Query() secretPhrase: string) {
		const fetchedExample: Example = await this.ExampleService.getExample(id)

		if (!fetchedExample) {
			throw new NotFoundError()
		}

		if (fetchedExample.secret_phrase != secretPhrase) {
			throw new UnauthorizedError()
		}

		await this.ExampleService.removeExample(fetchedExample.id)

		return
	}

	/**
	 *
	 * @summary Publish example
	 */
	@Patch("{id}/publish")
	@Response(401, "Unauthorized")
	@Response(404, "Not Found")
	@Response(409, "Conflict")
	@Response(500, "Internal Server Error")
	@SuccessResponse(200, "Published")
	public async publishExample(@Path() id: number, @Query() secretPhrase: string): Promise<Example> {
		const fetchedExample: Example = await this.ExampleService.getExample(id)

		if (!fetchedExample) {
			throw new NotFoundError()
		}

		if (fetchedExample.secret_phrase != secretPhrase) {
			throw new UnauthorizedError()
		}

		if (fetchedExample.public) {
			throw new ConflictError("Example already published")
		}

		const publishedExample: Example = await this.ExampleService.publishExample(fetchedExample.id)

		return publishedExample
	}
}
