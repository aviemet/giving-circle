import { ComponentConfig, Slot } from "@measured/puck"

import { Box } from "@/components"
import { usePresentationDataContext } from "@/layouts/Providers/PresentationDataProvider"

import { IteratorItemProvider } from "../dynamicData/IteratorItemContext"

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

interface OrgsIteratorDisplayProps {
	content: React.ComponentType
}

const OrgsIteratorDisplay = ({ content: Content }: OrgsIteratorDisplayProps) => {
	const contextData = usePresentationDataContext()
	const isEditor = contextData?.isEditor === true
	const orgs = getOrgsFromContext(contextData)

	if(isEditor) {
		return (
			<Box style={ { position: "relative", minWidth: 25, minHeight: 25, padding: 25 } }>
				<Content />
				<Box
					component="span"
					style={ {
						position: "absolute",
						bottom: 0,
						left: 0,
						fontSize: "0.75rem",
						opacity: 0.7,
					} }
				>
					Repeats for each organization
				</Box>
			</Box>
		)
	}

	if(orgs.length === 0) {
		return <></>
	}

	return (
		<Box
			style={ {
				display: "flex",
				flexWrap: "wrap",
				flex: 1,
				minWidth: 0,
			} }
		>
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
		</Box>
	)
}

export type OrgsIteratorProps = {
	content: Slot
}

export const orgsIteratorConfig: ComponentConfig<OrgsIteratorProps> = {
	fields: {
		content: { type: "slot" },
	},
	defaultProps: {
		content: [],
	},
	render: ({ content: Content }) => {
		return (
			<OrgsIteratorDisplay content={ Content } />
		)
	},
}
