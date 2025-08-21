import { ComponentConfig, Slot } from "@measured/puck"

import { useMockDataContext } from ".."


interface OrgsIteratorDisplayProps {
	children: React.ReactNode
}

const OrgsIteratorDisplay = ({ children }: OrgsIteratorDisplayProps) => {
	const { mockCircle } = useMockDataContext()

	if(!mockCircle.orgs) return children

	return (
		<>{ mockCircle.orgs.map(circle =>
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
