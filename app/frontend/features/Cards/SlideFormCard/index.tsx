import { modals } from "@mantine/modals"
import clsx from "clsx"

import { ActionIcon, Card, Text, Center, Link, ConditionalWrapper } from "@/components"
import { TrashIcon } from "@/components/Icons"
import { TextInput } from "@/components/Inputs"
import { isNonEmptyString } from "@/lib"

import { SlideThumbnail } from "../SlideThumbnail"
import * as classes from "./SlideFormCard.css"

interface SlideFormCardProps {
	path: string
	removeInput: () => void
	href?: string
	thumbnailUrl?: string
}

export function SlideFormCard({ path, removeInput, href, thumbnailUrl }: SlideFormCardProps) {
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
					<TrashIcon />
				</ActionIcon>
				<ConditionalWrapper
					condition={ isNonEmptyString(href) }
					wrapper={ children => <Link href={ href! }>{ children }</Link> }
				>
					<SlideThumbnail
						src={ thumbnailUrl }
						alt=""
					/>
				</ConditionalWrapper>
			</Card.Section>

			<Center>
				<TextInput name={ `${path}.title` } />
			</Center>
		</Card>
	)
}
