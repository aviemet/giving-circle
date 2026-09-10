import {
	type PresentationDataContextValue,
} from "@/features/presentation/PresentationDataProvider"
import {
	filterFinalistOrgs,
} from "@/features/presentation/values/finalists"

import { getOrgsFromContext, type ContextOrg } from "../../lib/dynamicData"

export const ITERATE_NONE = "none"
export const ITERATE_ORGS = "presentation.org"
export const ITERATE_FINALIST_ORGS = "presentation.finalist_org"
export const ORG_ITERATE_PATH_PREFIX = "presentation.org"
export const FINALIST_ORG_ITERATE_PATH_PREFIX = "presentation.finalist_org"

export const ITERATE_COLLECTIONS = [ITERATE_ORGS, ITERATE_FINALIST_ORGS] as const

export type IterateCollection = typeof ITERATE_COLLECTIONS[number]
export type IterateValue = typeof ITERATE_NONE | IterateCollection

export function isIterateCollection(value: string): value is IterateCollection {
	return value === ITERATE_ORGS || value === ITERATE_FINALIST_ORGS
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

export function isFinalistOrgIterate(value: IterateValue | undefined): boolean {
	return normalizeIterateValue(value) === ITERATE_FINALIST_ORGS
}

export function getIteratePathPrefix(iterate: IterateValue | undefined): string {
	switch(normalizeIterateValue(iterate)) {
		case ITERATE_ORGS:
			return ORG_ITERATE_PATH_PREFIX
		case ITERATE_FINALIST_ORGS:
			return FINALIST_ORG_ITERATE_PATH_PREFIX
		default:
			return ORG_ITERATE_PATH_PREFIX
	}
}

export function getIterateItems(
	contextData: PresentationDataContextValue | null | undefined,
	iterate: IterateValue | undefined,
): ContextOrg[] {
	if(isOrgIterate(iterate)) {
		return getOrgsFromContext(contextData)
	}

	if(isFinalistOrgIterate(iterate)) {
		return filterFinalistOrgs(
			getOrgsFromContext(contextData),
			contextData?.values?.finalist_org_ids,
		)
	}

	return []
}
