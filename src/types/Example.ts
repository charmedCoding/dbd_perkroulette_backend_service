export interface Example {
	/**
	 * @isInt
	 */
	id: number
	/**
	 * @minLength 3
	 * @maxLength 50
	 */
	title: string
	description?: string
	/**
	 * @minLength 25
	 * @maxLength 25
	 */
	secret_phrase: string
	/**
	 *
	 */
	weather: "sunny" | "rainy" | "cloudy"
	/**
	 * @isBool
	 * @default false
	 */
	public: boolean
}
