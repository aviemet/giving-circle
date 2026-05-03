export default interface UserTablePreferences {
	[model: string]: {
		hide?: Record<string, boolean>
		limit?: string
	}
}
