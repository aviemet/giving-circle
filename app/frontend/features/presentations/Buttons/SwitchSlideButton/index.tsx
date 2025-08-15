import clsx from "clsx"

import { Card, Image, Text } from "@/components"


import * as classes from "./SwitchSlideButton.css"

interface SwitchSlideButtonProps {
	slide: Schema.SlidesPersisted
	onClick: () => void
	active: boolean
}

const SwitchSlideButton = ({ slide, onClick, active }: SwitchSlideButtonProps) => {
	return (
		<Card
			withBorder
			shadow={ active ? "lg" : "xs" }
			radius="md"
			onClick={ onClick }
			className={ clsx(classes.buttonCard, { active }) }
		>
			<Card.Section>
				<Image
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
					height={ 140 }
				/>
			</Card.Section>

			<Card.Section withBorder inheritPadding py="xs">
				<Text fw={ 500 } truncate="end">
					{ slide.title || "Untitled Slide" }
				</Text>
			</Card.Section>
		</Card>
	)
}

export default SwitchSlideButton
