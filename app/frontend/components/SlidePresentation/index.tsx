import { Title } from "@/components"

interface SlidePresentationProps {
	presentation: Schema.PresentationsPresentation
}

const SlidePresentation = ({ presentation }: SlidePresentationProps) => {
	return (
		<Title>
			{ presentation.name }
		</Title>
	)
}

export default SlidePresentation
