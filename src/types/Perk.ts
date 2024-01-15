export interface Perk {
	/**
	 * @isInt
	 */
	id: number
	/**
	 * @minLength 3
	 * @maxLength 50
	 */
	name: string
	description?: string
	/**
	 * @minLength 25
	 * @maxLength 25
	 */
	
	character: string
	/**
	 * @minLength 25
	 * @maxLength 25
	 */
	img_url: string
}
