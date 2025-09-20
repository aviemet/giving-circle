import { type Config } from "@measured/puck"

import { Box } from "@/components"

import {
	cardConfig, type CardProps,
	containerConfig, type ContainerProps,
	gridConfig, type GridProps,
	headingConfig, type HeadingProps,
	imageConfig, type ImageProps,
	orgsIteratorConfig, type OrgsIteratorProps,
} from "./components"
import {
	colorField,
} from "./fields"

type RootProps = {
	title: string
	backgroundColor: string
}

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
		},
		defaultProps: {
			title: "Slide",
			backgroundColor: "#000000",
		},
		render: ({ children, backgroundColor }) => {
			return (
				<Box style={ { backgroundColor, width: "100%", height: "100%" } } p={ 0 } m={ 0 }>
					{ children }
				</Box>
			)
		},
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
		},
	},
}
