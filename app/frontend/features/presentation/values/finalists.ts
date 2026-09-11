import { useFinalistOrgIds } from "./useFinalistOrgIds"

export { useFinalistOrgIds }

export function isFinalistOrgId(finalistOrgIds: string[] | undefined, orgId: string) {
	if(!finalistOrgIds || finalistOrgIds.length === 0) return true
	return finalistOrgIds.includes(orgId)
}

export function filterFinalistOrgs<T extends { id: string }>(
	orgs: T[],
	finalistOrgIds: string[] | undefined,
): T[] {
	if(!finalistOrgIds || finalistOrgIds.length === 0) {
		return orgs
	}

	const finalistIdSet = new Set(finalistOrgIds)
	return orgs.filter((org) => finalistIdSet.has(org.id))
}
