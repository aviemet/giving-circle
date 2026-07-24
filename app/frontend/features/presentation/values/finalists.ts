import { useFinalistOrgIds } from "./useFinalistOrgIds"

export { useFinalistOrgIds }

export function isFinalistOrgId(finalistOrgIds: string[] | undefined, orgId: string) {
	if(!finalistOrgIds || finalistOrgIds.length === 0) return true
	return finalistOrgIds.includes(orgId)
}
