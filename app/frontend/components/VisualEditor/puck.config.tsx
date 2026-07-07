import { type Config } from "@measured/puck"

import {
	cardConfig,
	containerConfig,
	gridConfig,
	headingConfig,
	imageConfig,
	orgsIteratorConfig,
	SlideRoot,
	type PuckComponentProps,
	type SlideRootProps,
} from "./components"
import {
	backgroundImageField,
	colorField,
	defaultBackgroundImageValue,
} from "./fields"

type RootProps = SlideRootProps


export const config: Config<{
	components: PuckComponentProps
	root: RootProps
	categories: ["layout", "content", "data", "other"]
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
		},
		defaultProps: {
			title: "Slide",
			backgroundColor: "#000000",
			backgroundImage: defaultBackgroundImageValue(),
		},
		render: (props) => <SlideRoot { ...props } />,
	},

	components: {
		Heading: headingConfig,
		Container: containerConfig,
		Grid: gridConfig,
		Card: cardConfig,
		Image: imageConfig,
		OrgsIterator: orgsIteratorConfig,
	},

	categories: {
		layout: {
			title: "Layout",
			components: ["Container", "Grid" ],
		},
		content: {
			title: "Content",
			components: ["Heading", "Card", "Image"],
		},
		data: {
			title: "Data",
			components: ["OrgsIterator"],
		},
		other: {
			title: "All Other Components",
			visible: true,
		},
	},
}
