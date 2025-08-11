import { Card, Image, Text } from "@/components"

interface SwitchSlideButtonProps {
	slide: Schema.SlidesPersisted
	onClick: () => void
}

const SwitchSlideButton = ({ slide, onClick }: SwitchSlideButtonProps) => {
	return (
		<Card
			withBorder
			shadow="sm"
			radius="md"
			onClick={ onClick }
			style={ { cursor: "pointer" } }
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
