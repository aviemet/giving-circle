import { type Config } from "@puckeditor/core"

import {
	barGraphAllocatedTotalsConfig,
	cardConfig,
	containerConfig,
	gridConfig,
	headingConfig,
	imageConfig,
	leverageBarConfig,
	textConfig,
	timerConfig,
	type PuckComponentProps,
} from "@/components/VisualEditor/components"
import {
	backgroundField,
	boxModelField,
	defaultBackgroundValue,
	defaultFontValue,
	flexField,
	fontField,
	normalizeBackgroundValue,
} from "@/components/VisualEditor/fields"
import { SlideRoot, type SlideRootProps } from "@/components/VisualEditor/lib/SlideRoot"
import { i18n } from "@/lib/i18n"

export type SlideEditorConfig = Config<{
	components: PuckComponentProps
	root: SlideRootProps
	categories: ["layout", "content", "elements"]
}>

export const slidePuckOverrides: SlideEditorConfig = {
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
					background: normalizeBackgroundValue(props.background),
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
		BarGraphAllocatedTotals: barGraphAllocatedTotalsConfig,
		LeverageBar: leverageBarConfig,
		Timer: timerConfig,
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
		elements: {
			title: "Elements",
			components: ["BarGraphAllocatedTotals", "LeverageBar", "Timer"],
		},
	},
}
