import { ComponentConfig, Slot, type SlotComponent } from "@measured/puck"

import { Box } from "@/components"
import { usePresentationDataContext } from "@/layouts/Providers/PresentationDataProvider"

import { IteratorItemProvider } from "../dynamicData/IteratorItemContext"
import { presentationSlot } from "../Puck.css"
import { slotDropZoneProps } from "../slotEditor"

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
	content: SlotComponent
	slotProps?: ReturnType<typeof slotDropZoneProps>
}

const OrgsIteratorDisplay = ({ content: Content, slotProps }: OrgsIteratorDisplayProps) => {
	const contextData = usePresentationDataContext()
	const isEditor = contextData?.isEditor === true
	const orgs = getOrgsFromContext(contextData)

	if(isEditor) {
		return (
			<Box
				className={ presentationSlot }
				style={ { position: "relative", minWidth: "100%", padding: 16 } }
			>
				<Content
					className={ presentationSlot }
					{ ...slotProps }
				/>
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
			<OrgsIteratorDisplay
				content={ Content }
				slotProps={ slotDropZoneProps() }
			/>
		)
	},
}
