import { unset, get, set } from 'lodash'
import { Routes } from '@/lib'

export * as Routes from '@/types/routes'

const B64_SEPARATOR = ' '

export const encodeId = (model: string, id: number) => btoa(`${model}${B64_SEPARATOR}${id}`)

export const decodeId = (id: string) => {
	const parts = atob(id).split(B64_SEPARATOR)
	return {
		model: parts[0],
		id: parts[1],
	}
}

export const capitalize = (str?: string|null): string => {
	if(typeof str !== 'string') return ''
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const camelize = (str?: string|null) => {
	if(typeof str !== 'string') return ''
	return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
}

export const polymorphicRoute = (model: string, param: string|number) => {
	// @ts-ignore
	return Routes[camelize(model)](param)
}

export const coerceArray = (arg: string | string[]) => {
	if(Array.isArray(arg)) return arg
	return [arg]
}
