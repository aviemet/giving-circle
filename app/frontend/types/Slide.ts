export interface Slide {
	id: string | number
	name: string
	order: number
	zones: Record<string, unknown>
}
