import { type Config } from "@measured/puck"

import { theme } from "@/lib"

import { cardConfig, CardProps } from "./components/Card"
import { gridConfig, GridProps } from "./components/Grid"
import { headingConfig, HeadingProps } from "./components/Heading"
import { imageConfig, ImageProps } from "./components/Image"

type RootProps = {
	title: string
	backgroundColor: string
}

type ComponentProps = {
	Heading: HeadingProps
	Grid: GridProps
	Card: CardProps
	Image: ImageProps
}

export const config: Config<ComponentProps, RootProps> = {
	// root: {
	// 	inline: true,
	// 	fields: {
	// 		title: { type: "text" },
	// 		backgroundColor: { type: "text" },
	// 	},
	// 	defaultProps: {
	// 		title: "Slide",
	// 		backgroundColor: "#000000",
	// 	},
	// 	render: ({ children, backgroundColor }) => {
	// 		return (
	// 			<div style={ { backgroundColor, width: "100%", height: "100%" } }>
	// 				{ children }
	// 			</div>
	// 		)
	// 	},
	// },

	components: {
		Heading: headingConfig,
		Grid: gridConfig,
		Card: cardConfig,
		Image: imageConfig,
	},

	categories: {
		layout: {
			title: "Layout",
			components: ["Heading", "Grid", "Card"],
		},
		content: {
			title: "Content",
			components: ["Heading", "Image"],
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

