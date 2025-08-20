import { ComponentConfig, Slot } from "@measured/puck"

import { createContext } from "@/lib/hooks"

const [useOrgsContext, OrgsContextProvider] = createContext()
export { useOrgsContext }

export type OrgsIteratorProps = {
	content: Slot
	orgs: "orgs" | "members"
}

export const orgsIteratorConfig: ComponentConfig<OrgsIteratorProps> = {
	fields: {
		content: { type: "slot" },
		orgs: {
			type: "select",
			options: [
				{ label: "Organizations", value: "orgs" },
				{ label: "Members", value: "members" },
			],
		},
	},
	defaultProps: {
		content: [],
		orgs: "orgs",
	},
	render: ({ content: Content, orgs }) => {
		return (
			<OrgsContextProvider value={ { orgs } }>
				<Content />
			</OrgsContextProvider>
		)
	},
}
