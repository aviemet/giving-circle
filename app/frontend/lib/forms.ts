import { isEmpty } from "es-toolkit/compat"

/**
 * Test if a value is "unset" in the context of a form input value. Returns true if the value can be considered "empty"
 * @param v Variable to test whether is an "unset" value
 * @returns boolean
 */
export const isUnset = (value: unknown) => {
	if(typeof value === "number") return Number.isNaN(value)
	if(value instanceof Date) return false
	if(Array.isArray(value)) return !value.some(element => element !== "" && element !== undefined)
	return isEmpty(value)
}
