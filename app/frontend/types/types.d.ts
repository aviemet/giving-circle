
declare global {
	type FlashMessage = Record<'success' | 'alert' | 'info' | 'warning', string>
}
