import { PresentationDataContextValue } from "@/layouts/Providers/PresentationDataProvider"

export function getOrgsFromContext(contextData: PresentationDataContextValue | null | undefined): Schema.OrgsPersisted[] {
	const presentationOrgs = contextData?.presentation?.orgs
	if(presentationOrgs && presentationOrgs.length > 0) {
		return presentationOrgs
	}

	if(contextData?.circle && "orgs" in contextData.circle && Array.isArray(contextData.circle.orgs)) {
		const circleOrgs = contextData.circle.orgs
		if(circleOrgs.length > 0) {
			return circleOrgs
		}
	}

	return []
}
