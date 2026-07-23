import { Slot, type ComponentConfig, type SlotComponent } from "@puckeditor/core"

import { usePresentationDataContext } from "@/features/presentation"
import { i18n } from "@/lib/i18n"

import { OrgsIteratorDisplay } from "./OrgsIteratorDisplay"
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

const t = i18n.t.bind(i18n)

export const orgsIteratorConfig: ComponentConfig<OrgsIteratorProps> = {
	label: t("slides.editor.components.orgs_iterator.label"),
	fields: {
		content: { type: "slot" },
	},
	defaultProps: {
		content: [],
	},
	render: (props) => <OrgsIteratorComponent { ...props } />,
}
