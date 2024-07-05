import React from 'react'
import { ActionIcon, Card, Image, Text, Center } from '@/Components'
import { CrossIcon } from '@/Components/Icons'
import { modals } from '@mantine/modals'

import cx from 'clsx'
import * as classes from './SlideCard.css'
import { useForm } from 'use-inertia-form'
import { TextInput } from '@/Components/Form'

interface SlideCardProps {
	path: string
	removeInput: () => void
}

const SlideCard = ({ path, removeInput }: SlideCardProps) => {
	const { getData, data } = useForm()

	const handleRemoveElement = () => {
		modals.openConfirmModal({
			title: 'Remove this slide?',
			children: (
				<Text>Click confirm to remove this slide from this presentation template.</Text>
			),
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => removeInput(),
		})
	}

	return (
		<Card
			shadow="sm"
			padding="md"
			radius="md"
			withBorder
			className={ cx(classes.slideCard) }
		>
			<Card.Section mb="sm" className={ cx(classes.imageSection) }>
				<ActionIcon
					variant="transparent"
					color="white"
					className={ cx('remove-input-button') }
					onClick={ handleRemoveElement }
				>
					<CrossIcon />
				</ActionIcon>
				<Image
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
					height={ 140 }
				/>
			</Card.Section>

			<Center>
				<TextInput name={ `${path}.name` } />
			</Center>
		</Card>
	)
}

export default SlideCard
