import { ComponentConfig, Slot } from "@measured/puck"

import { usePresentationDataContext } from "../../../layouts/Providers/PresentationDataProvider"


interface OrgsIteratorDisplayProps {
	children: React.ReactNode
}

const OrgsIteratorDisplay = ({ children }: OrgsIteratorDisplayProps) => {
	const contextData = usePresentationDataContext()

	const orgs = "orgs" in (contextData?.circle || {})
		? (contextData?.circle as Schema.CirclesMock).orgs
		: undefined

	if(!orgs) return children

	return (
		<>{ orgs.map((_org: Schema.OrgsPersisted) =>
			children
		) }</>
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
			<OrgsIteratorDisplay>
				<Content />
			</OrgsIteratorDisplay>
		)
	},
}
