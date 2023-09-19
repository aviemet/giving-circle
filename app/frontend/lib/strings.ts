export const capitalize = (str?: string|null): string => {
	if(typeof str !== 'string') return ''
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const camelize = (str?: string|null) => {
	if(typeof str !== 'string') return ''
	return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
}
