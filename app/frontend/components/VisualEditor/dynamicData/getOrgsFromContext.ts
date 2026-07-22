import { PresentationDataContextValue } from "@/layouts/Providers/PresentationDataProvider"

export type ContextOrg =
	| Schema.OrgsPersisted
	| Schema.PresentationsOrgsPersisted

export function getOrgsFromContext(contextData: PresentationDataContextValue | null | undefined): ContextOrg[] {
	const presentation = contextData?.presentation
	if(presentation && "orgs" in presentation && Array.isArray(presentation.orgs) && presentation.orgs.length > 0) {
		return presentation.orgs
	}

	if(contextData?.circle && "orgs" in contextData.circle && Array.isArray(contextData.circle.orgs)) {
		const circleOrgs = contextData.circle.orgs
		if(circleOrgs.length > 0) {
			return circleOrgs
		}
	}

	return []
}
