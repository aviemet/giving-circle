import { type Config } from "@measured/puck"

import {
	cardConfig, type CardProps,
	containerConfig, type ContainerProps,
	gridConfig, type GridProps,
	headingConfig, type HeadingProps,
	imageConfig, type ImageProps,
	orgsIteratorConfig, type OrgsIteratorProps,
	SlideRoot,
	type SlideRootProps,
} from "./components"
import {
	backgroundImageField,
	colorField,
	defaultBackgroundImageValue,
} from "./fields"

type RootProps = SlideRootProps

type ComponentProps = {
	Grid: GridProps
	Container: ContainerProps
	Heading: HeadingProps
	Card: CardProps
	Image: ImageProps
	OrgsIterator: OrgsIteratorProps
}

export const config: Config<{
	components: ComponentProps
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
