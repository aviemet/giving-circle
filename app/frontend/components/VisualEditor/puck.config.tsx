import { type Config } from "@measured/puck"

import { Box } from "@/components"
import { theme } from "@/lib"

import { cardConfig, CardProps } from "./components/Card"
import { containerConfig, ContainerProps } from "./components/Container"
import { gridConfig, GridProps } from "./components/Grid"
import { headingConfig, HeadingProps } from "./components/Heading"
import { imageConfig, ImageProps } from "./components/Image"
import { colorField } from "./fields"

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
}

export const config: Config<ComponentProps, RootProps> = {
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
	},

	categories: {
		layout: {
			title: "Layout",
			components: ["Grid", "Container"],
		},
		content: {
			title: "Content",
			components: ["Heading", "Card", "Image"],
		},
		interactive: {
			title: "Interactive",
			components: [],
		},
		other: {
			title: "All Other Components",
		},
	},
}

