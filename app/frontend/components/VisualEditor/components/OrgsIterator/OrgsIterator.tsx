import { Box } from "@/components"
import { usePresentationDataContext } from "@/layouts/Providers/PresentationDataProvider"

import { type OrgsIteratorComponentProps } from "./orgsIteratorConfig"
import { IteratorItemProvider } from "../../dynamicData/IteratorItemContext"

const PATH_PREFIX = "presentation.org"

function getOrgsFromContext(contextData: ReturnType<typeof usePresentationDataContext>): Schema.OrgsPersisted[] {
	const presentation = contextData?.presentation
	if(presentation && "orgs" in presentation && Array.isArray(presentation.orgs)) {
		return presentation.orgs
	}
	if(contextData?.circle && "orgs" in contextData.circle) {
		return (contextData.circle).orgs
	}
	return []
}

export function OrgsIteratorDisplay({ content: Content }: OrgsIteratorComponentProps) {
	const contextData = usePresentationDataContext()
	const orgs = getOrgsFromContext(contextData)

	if(orgs.length === 0) {
		return <></>
	}

	return (
		<>
			{ orgs.map((org, index) => (
				<Box key={ org.id } style={ { flex: 1, minWidth: 0 } }>
					<IteratorItemProvider<Schema.OrgsPersisted>
						value={ {
							pathPrefix: PATH_PREFIX,
							currentItem: org,
							index,
						} }
					>
						<Content />
					</IteratorItemProvider>
				</Box>
			) ) }
		</>
	)
}
