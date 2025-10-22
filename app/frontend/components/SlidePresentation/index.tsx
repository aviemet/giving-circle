import { Config, Render } from "@measured/puck"

import { config } from "../VisualEditor/puck.config"

interface SlidePresentationProps {
	presentation: Schema.PresentationsPresentation
	activeSlide: Schema.SlidesPresentation
}

const SlidePresentation = ({ activeSlide }: SlidePresentationProps) => {

	return (
		<Render
			config={ config as Config }
			data={ activeSlide.data }
			metadata={ {} }
		/>
	)
}

export default SlidePresentation
