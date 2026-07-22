import { PageProps } from "@inertiajs/core"
import { usePage } from "@inertiajs/react"
import { Render } from "@puckeditor/core"
import { motion, AnimatePresence } from "motion/react"

import { Box } from "@/components"
import { PresentationDataProvider } from "@/layouts/Providers/PresentationDataProvider"

import { config } from "../VisualEditor/puck.config"

export type TransitionType = "fade" | "slide" | "slideUp" | "slideDown" | "scale" | "none"

interface SlidePresentationPageProps extends PageProps {
	circle?: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation?: Schema.PresentationsPresentation
}

interface SlidePresentationProps {
	presentation?: Schema.PresentationsPresentation
	activeSlide: Schema.SlidesPresentation
	circle?: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	transitionType?: TransitionType
	transitionDuration?: number
}

function useSlidePresentationContext(props: SlidePresentationProps) {
	const { props: pageProps } = usePage<SlidePresentationPageProps>()

	return {
		circle: props.circle ?? pageProps.circle,
		theme: props.theme ?? pageProps.theme,
		presentation: props.presentation ?? pageProps.presentation,
	}
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
	presentation: presentationProp,
	activeSlide,
	circle: circleProp,
	theme: themeProp,
	transitionType = "fade",
	transitionDuration = 0.3,
}: SlidePresentationProps) => {
	const { circle, theme, presentation } = useSlidePresentationContext({
		presentation: presentationProp,
		activeSlide,
		circle: circleProp,
		theme: themeProp,
	})
	const variants = transitionVariants[transitionType]

	if(!circle || !presentation) {
		return (
			<Box style={ { width: "100%", height: "100%", backgroundColor: "#000" } } />
		)
	}

	return (
		<PresentationDataProvider value={ { circle, theme, presentation } }>
			<Box style={ { width: "100%", height: "100vh", backgroundColor: "#000", overflow: "hidden" } }>
				<AnimatePresence mode="wait">
					<motion.div
						key={ activeSlide.id }
						initial={ variants.initial }
						animate={ variants.animate }
						exit={ variants.exit }
						transition={ { duration: transitionDuration } }
						style={ { width: "100%", height: "100%", overflow: "hidden" } }
					>
						<Render
							config={ config }
							data={ activeSlide.data }
							metadata={ {} }
						/>
					</motion.div>
				</AnimatePresence>
			</Box>
		</PresentationDataProvider>
	)
}

export { SlidePresentation }
