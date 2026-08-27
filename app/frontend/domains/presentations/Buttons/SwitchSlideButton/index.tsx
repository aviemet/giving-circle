import clsx from "clsx"

import { Card, Text } from "@/components"
import { SlideThumbnail } from "@/features/Cards"

import * as classes from "./SwitchSlideButton.css"

interface SwitchSlideButtonProps {
	slide: Schema.SlidesPersisted
	onClick: () => void
	active: boolean
}

export const SwitchSlideButton = ({ slide, onClick, active }: SwitchSlideButtonProps) => {
	return (
		<Card
			withBorder
			shadow={ active ? "lg" : "xs" }
			radius="md"
			onClick={ onClick }
			className={ clsx(classes.buttonCard, { active }) }
		>
			<Card.Section>
				<SlideThumbnail
					src={ slide.thumbnail_url }
					alt=""
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
