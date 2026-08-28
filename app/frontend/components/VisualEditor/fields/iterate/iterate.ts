import { type PresentationDataValue } from "@/features/presentation"

import { getOrgsFromContext, type ContextOrg } from "../../dynamicData/getOrgsFromContext"

export const ITERATE_NONE = "none"
export const ITERATE_ORGS = "presentation.org"
export const ORG_ITERATE_PATH_PREFIX = "presentation.org"

export const ITERATE_COLLECTIONS = [ITERATE_ORGS] as const

export type IterateCollection = typeof ITERATE_COLLECTIONS[number]
export type IterateValue = typeof ITERATE_NONE | IterateCollection

export function isIterateCollection(value: string): value is IterateCollection {
	return value === ITERATE_ORGS
}

export function isIterateValue(value: string): value is IterateValue {
	return value === ITERATE_NONE || isIterateCollection(value)
}

export function normalizeIterateValue(value: IterateValue | undefined): IterateValue {
	if(value !== undefined && isIterateCollection(value)) {
		return value
	}

	return ITERATE_NONE
}

export function isIterateOn(value: IterateValue | undefined): boolean {
	return normalizeIterateValue(value) !== ITERATE_NONE
}

export function isOrgIterate(value: IterateValue | undefined): boolean {
	return normalizeIterateValue(value) === ITERATE_ORGS
}

export function getIterateItems(
	contextData: PresentationDataValue | null | undefined,
	iterate: IterateValue | undefined,
): ContextOrg[] {
	if(!isOrgIterate(iterate)) {
		return []
	}

	return getOrgsFromContext(contextData)
}
