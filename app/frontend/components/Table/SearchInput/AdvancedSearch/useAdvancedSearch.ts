import { router } from "@inertiajs/react"
import clsx from "clsx"
import React, { useCallback, useMemo, useState } from "react"

import { NestedURLSearchParams, isUnset } from "@/lib"
import { useLocation } from "@/lib/hooks"

import { buildSearchLink } from "./buildSearchLink"


type SpecialSearchTypes = "date"

interface Options {
	path: string
}

export type InputParam<T = string | Date> = {
	name: string
	default?: T
	dependent?: string | string[]
	keyUpListener?: boolean
	type?: SpecialSearchTypes
}

export type ParamValue = string | number | Date | Date[] | undefined | null

function dateFromSearchParam(rawValue: unknown): Date | null {
	if(rawValue instanceof Date && !Number.isNaN(rawValue.getTime())) {
		return rawValue
	}

	if(typeof rawValue !== "string" || rawValue === "") {
		return null
	}

	const dateValue = new Date(rawValue)
	if(Number.isNaN(dateValue.getTime())) {
		return null
	}

	return dateValue
}

/**
 * Hook for building advanced search interfaces
 * @param inputParams Array of objects with the following structure: { label: string, name: string, default?: unknown, dependent?: string|string[] }
 * @param options Options
 * @returns link: A URL with the search parameters represented as GET params,
 *  reset(): A method to clear all search values,
 * 	inputProps(name): Method to return object of props to be passed into an input
 */
const useAdvancedSearch = (
	inputParams: InputParam[],
	options?: Options,
) => {
	// TODO: Trying to infer keys from prop
	type InputParamName = typeof inputParams[number]["name"]

	const location = useLocation()

	const localInputParams = useMemo(() => {
		const finalParams: InputParam[] = []

		inputParams.forEach(param => {
			switch(param?.type) {
				case "date":
					finalParams.push({
						name: `${param.name}[start]`,
					})
					finalParams.push({
						name: `${param.name}[end]`,
					})
					finalParams.push({
						name: `${param.name}[type]`,
						dependent: `${param.name}[start]`,
					})
					break
				default:
					finalParams.push(param)
					return
			}
		})

		return inputParams.concat(finalParams)
	}, [inputParams])

	// Builds a Map from keys in `inputParams` with values from URL string
	// These are the starting values for local state used for form inputs
	const startingValues = useMemo(() => localInputParams.reduce(
		(data: NestedURLSearchParams, param) => {
			// Handle special input types
			switch(param?.type) {
				case "date":
					data.set(`${param.name}[type]`, data.get(`${param.name}[type]`) || "exact")
					data.set(`${param.name}[start]`, data.get(`${param.name}[start]`) || "")
					data.set(`${param.name}[end]`, data.get(`${param.name}[end]`) || "")

					return data
				default:
					data.set(param.name, data.get(param.name) || param.default || "")
			}

			return data
		},
		location.nestedParams.clone(),
	), [localInputParams, location.nestedParams])

	const [values, setValues] = useState(startingValues)

	// Build URL params when input values change
	const searchLink = useMemo(
		() => buildSearchLink(localInputParams, values),
		[localInputParams, values],
	)

	const resetValues = useCallback(() => {
		setValues(prevValues => {
			const newValues = prevValues.clone()

			inputParams.forEach(param => {
				switch(param?.type) {
					case "date":
						newValues.set(`${param.name}[type]`, "exact")
						newValues.set(`${param.name}[start]`, "")
						newValues.set(`${param.name}[end]`, "")
						break
					default:
						if(param.default !== undefined) {
							newValues.set(param.name, param.default)
						} else {
							newValues.unset(param.name)
						}
				}
			})

			return newValues
		})
	}, [inputParams])

	// Method returned from hook to be passed to an input
	const buildInputProps = (name: InputParamName) => {
		const param = localInputParams.find(param => param.name === name)
		const dateParam = inputParams.find(p => p.type === "date" && (name === `${p.name}[start]` || name === `${p.name}[end]` || name === `${p.name}[type]`))
		const rawValue = values.get(name)

		let value: string | Date | null
		if(dateParam && (name.endsWith("[start]") || name.endsWith("[end]"))) {
			value = dateFromSearchParam(rawValue)
		} else if(typeof rawValue === "string") {
			value = rawValue
		} else if(typeof rawValue === "number") {
			value = String(rawValue)
		} else {
			value = ""
		}

		return {
			name,
			value,
			mb: 10,
			...( param?.keyUpListener !== false && { onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => {
				if(e.key === "Enter") {
					router.get(searchLink, undefined, { preserveScroll: true })
				}
			} }),
			wrapperProps: {
				className: clsx({ highlighted: !isUnset(value) && !param?.dependent }),
			},
		}
	}

	const setInputValue = useCallback((name: InputParamName, value: ParamValue) => setValues(prevValues => {
		const newValues = prevValues.clone()
		newValues.set(name, value)
		return newValues
	}), [])

	return {
		values,
		link: searchLink,
		inputProps: buildInputProps,
		setInputValue,
		reset: resetValues,
	}
}

export { useAdvancedSearch }
