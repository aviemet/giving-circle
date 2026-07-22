import { type ComponentConfig } from "@measured/puck"

import { i18n } from "@/lib/i18n"

import { HeadingDisplay } from "./Heading"
import { colorField, tagsField } from "../../fields"

export type HeadingProps = {
	title: string
	padding: number
	order: 1 | 2 | 3 | 4 | 5 | 6
	color: string
}

const t = i18n.t.bind(i18n)

export const headingConfig: ComponentConfig<HeadingProps> = {
	label: t("slides.editor.components.heading.label"),
	fields: {
		title: tagsField({
			label: t("slides.editor.components.heading.title"),
		}),
		padding: { type: "number", label: t("slides.editor.components.heading.padding") },
		order: {
			type: "select",
			label: t("slides.editor.components.heading.level"),
			options: [
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
			],
		},
		color: colorField({
			label: t("slides.editor.components.heading.text_color"),
		}),
	},

	defaultProps: {
		title: t("slides.editor.components.heading.default_title"),
		padding: 16,
		order: 1,
		color: "#FFFFFF",
	},

	render: (props) => <HeadingDisplay { ...props } />,
}
