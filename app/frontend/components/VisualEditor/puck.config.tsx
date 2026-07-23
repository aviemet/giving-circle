import { type Config } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import {
	barGraphAllocatedTotalsConfig,
	cardConfig,
	containerConfig,
	gridConfig,
	headingConfig,
	imageConfig,
	orgsIteratorConfig,
	SlideRoot,
	textConfig,
	type PuckComponentProps,
	type SlideRootProps,
} from "./components"
import {
	backgroundField,
	boxModelField,
	defaultBackgroundValue,
	defaultFontValue,
	flexField,
	fontField,
	normalizeBackgroundValue,
} from "./fields"

type RootProps = SlideRootProps

export type EditorConfig = Config<{
	components: PuckComponentProps
	root: RootProps
	categories: ["layout", "content", "data", "elements", "other"]
}>

export const config: EditorConfig = {
	root: {
		inline: true,
		fields: {
			title: {
				type: "text",
				label: i18n.t("slides.editor.root.title"),
			},
			background: backgroundField(),
			font: fontField({
				allowInherit: false,
			}),
			spacing: boxModelField(),
			flex: flexField(),
		},
		defaultProps: {
			title: "Slide",
			background: defaultBackgroundValue("#000000"),
			font: defaultFontValue(),
			spacing: {
				margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
				padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
			},
			flex: {
				display: "flex",
				flexDirection: "column",
				flexWrap: "nowrap",
				alignItems: "stretch",
				justifyContent: "flex-start",
				overflow: "hidden",
				gap: 0,
			},
		},
		resolveData: ({ props }) => {
			if(props === undefined) {
				return {}
			}

			return {
				props: {
					...props,
					background: normalizeBackgroundValue(props.background, {
						color: props.backgroundColor,
						image: props.backgroundImage,
					}),
				},
			}
		},
		render: (props) => <SlideRoot { ...props } />,
	},

	components: {
		Heading: headingConfig,
		Text: textConfig,
		Container: containerConfig,
		Grid: gridConfig,
		Card: cardConfig,
		Image: imageConfig,
		OrgsIterator: orgsIteratorConfig,
		BarGraphAllocatedTotals: barGraphAllocatedTotalsConfig,
	},

	categories: {
		layout: {
			title: "Layout",
			components: ["Container", "Grid" ],
		},
		content: {
			title: "Content",
			components: ["Heading", "Text", "Card", "Image"],
		},
		data: {
			title: "Data",
			components: ["OrgsIterator"],
		},
		elements: {
			title: "Elements",
			components: ["BarGraphAllocatedTotals"],
		},
		other: {
			title: "All Other Components",
			visible: true,
		},
	},
}
