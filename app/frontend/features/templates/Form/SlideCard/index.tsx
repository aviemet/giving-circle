import { modals } from "@mantine/modals"
import clsx from "clsx"
import { useForm } from "use-inertia-form"

import { ActionIcon, Card, Image, Text, Center, Link, ConditionalWrapper } from "@/components"
import { TextInput } from "@/components/Form"
import { CrossIcon } from "@/components/Icons"
import { isNonEmptyString } from "@/lib"

import * as classes from "./SlideCard.css"

interface SlideCardProps {
	path: string
	removeInput: () => void
	href?: string
}

const SlideCard = ({ path, removeInput, href }: SlideCardProps) => {
	const { getData, data } = useForm()

	const handleRemoveElement = () => {
		modals.openConfirmModal({
			title: "Remove this slide?",
			children: (
				<Text>Click confirm to remove this slide from this presentation template.</Text>
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onConfirm: () => removeInput(),
		})
	}

	return (
		<Card
			shadow="sm"
			padding="md"
			radius="md"
			withBorder
			className={ clsx(classes.slideCard) }
		>
			<Card.Section mb="sm" className={ clsx(classes.imageSection) }>
				<ActionIcon
					variant="transparent"
					color="white"
					className={ clsx("remove-input-button") }
					onClick={ handleRemoveElement }
				>
					<CrossIcon />
				</ActionIcon>
				<ConditionalWrapper
					condition={ isNonEmptyString(href) }
					wrapper={ children => <Link href={ href! }>{ children }</Link> }
				>
					<Image
						src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
						height={ 140 }
					/>
				</ConditionalWrapper>
			</Card.Section>

			<Center>
				<TextInput name={ `${path}.name` } />
			</Center>
		</Card>
	)
}

export default SlideCard
