import { type Config } from "@measured/puck"

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
	backgroundImageField,
	colorField,
	defaultBackgroundImageValue,
	flexField,
} from "./fields"

type RootProps = SlideRootProps


export const config: Config<{
	components: PuckComponentProps
	root: RootProps
	categories: ["layout", "content", "data", "elements", "other"]
}> = {
	root: {
		inline: true,
		fields: {
			title: { type: "text" },
			backgroundColor: colorField({
				label: "Background Color",
			}),
			backgroundImage: backgroundImageField({
				label: "Background Image",
			}),
			flex: flexField(),
		},
		defaultProps: {
			title: "Slide",
			backgroundColor: "#000000",
			backgroundImage: defaultBackgroundImageValue(),
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
