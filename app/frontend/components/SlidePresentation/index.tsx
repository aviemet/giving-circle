import { Config, Render } from "@measured/puck"
import { motion, AnimatePresence } from "motion/react"

import { config } from "../VisualEditor/puck.config"

export type TransitionType = "fade" | "slide" | "slideUp" | "slideDown" | "scale" | "none"

interface SlidePresentationProps {
	presentation: Schema.PresentationsPresentation
	activeSlide: Schema.SlidesPresentation
	transitionType?: TransitionType
	transitionDuration?: number
}

const transitionVariants = {
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	slide: {
		initial: { opacity: 0, x: 100 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -100 },
	},
	slideUp: {
		initial: { opacity: 0, y: 100 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -100 },
	},
	slideDown: {
		initial: { opacity: 0, y: -100 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 100 },
	},
	scale: {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
	},
	none: {
		initial: {},
		animate: {},
		exit: {},
	},
}

const SlidePresentation = ({
	activeSlide,
	transitionType = "fade",
	transitionDuration = 0.3,
}: SlidePresentationProps) => {
	const variants = transitionVariants[transitionType]

	return (
		<div style={ { width: "100%", height: "100%", backgroundColor: "#000" } }>
			<AnimatePresence mode="wait">
				<motion.div
					key={ activeSlide.id }
					initial={ variants.initial }
					animate={ variants.animate }
					exit={ variants.exit }
					transition={ { duration: transitionDuration } }
					style={ { width: "100%", height: "100%" } }
				>
					<Render
						config={ config as Config }
						data={ activeSlide.data }
						metadata={ {} }
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default SlidePresentation
