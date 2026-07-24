import { usePresentationDataContext } from "../PresentationDataProvider"

export function useFinalistOrgIds() {
	const { values } = usePresentationDataContext()
	return values?.finalist_org_ids
}
