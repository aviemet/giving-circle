import { Slot, type ComponentConfig, type SlotComponent } from "@measured/puck"

import { usePresentationDataContext } from "@/layouts/Providers/PresentationDataProvider"

import { OrgsIteratorDisplay } from "./OrgsIterator"
import { OrgsIteratorEditor } from "./OrgsIteratorEditor"

export type OrgsIteratorProps = {
	content: Slot
}

export type OrgsIteratorComponentProps = {
	content: SlotComponent
}

function OrgsIteratorComponent({ content }: OrgsIteratorComponentProps) {
	const contextData = usePresentationDataContext()
	const isEditor = contextData?.isEditor === true

	if(isEditor) {
		return <OrgsIteratorEditor content={ content } />
	}

	return <OrgsIteratorDisplay content={ content } />
}

export const orgsIteratorConfig: ComponentConfig<OrgsIteratorProps> = {
	label: "Orgs Iterator",
	fields: {
		content: { type: "slot" },
	},
	defaultProps: {
		content: [],
	},
	render: (props) => <OrgsIteratorComponent { ...props } />,
}
