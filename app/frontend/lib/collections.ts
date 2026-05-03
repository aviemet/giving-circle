import { cloneDeep, isPlainObject, unset } from "es-toolkit/compat"

export { NestedObject } from "./Collections/NestedObject"
export { NestedURLSearchParams } from "./Collections/NestedURLSearchParams"

export const coerceArray = <T extends unknown>(arg: T | T[] | null | undefined) => {
	if(arg === null || arg === undefined) return []

	if(Array.isArray(arg)) return arg

	return [arg]
}

export const exclude = <T extends any, K extends string>(obj: T, keys: K | K[]): Omit<T, K> | undefined => {
	const clone = cloneDeep(obj)
	if(clone) {
		coerceArray(keys).forEach(key => {
			unset(clone, key)
		})
	}
	return clone
}

export function renameObjectWithAttributes<T extends Record<string, unknown>>(value: T) {
	return value
}

export function flattenToPaths(value: Record<string, unknown>) {
	const entries: Array<[string, unknown]> = []

	const walk = (current: unknown, prefix: string) => {
		if(isRecord(current)) {
			for(const [key, child] of Object.entries(current)) {
				const path = prefix ? `${prefix}.${key}` : key
				walk(child, path)
			}
			return
		}

		if(Array.isArray(current)) {
			current.forEach((child, index) => {
				const path = prefix ? `${prefix}.${index}` : String(index)
				walk(child, path)
			})
			return
		}

		if(prefix) entries.push([prefix, current])
	}

	walk(value, "")

	return entries
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return isPlainObject(value) && !Array.isArray(value)
}
