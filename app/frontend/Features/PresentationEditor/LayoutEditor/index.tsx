import React, { useRef } from 'react'
import { Button, Divider, Flex, Group, Title } from '@/Components'
import { TextInput } from '@/Components/Inputs'
import { useDynamicInputs, useForm } from 'use-inertia-form'
import { modals } from '@mantine/modals'
import SlideCard from './SlideCard'

const LayoutEditor = () => {
	const { getData, data } = useForm()

	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const { addInput, removeInput, paths } = useDynamicInputs({
		model: 'presentation_slides',
		emptyData: {
			name: '',
			order: NaN,
			content: '',
		},
	})

	const handleAddSlide = () => {
		modals.openConfirmModal({
			title: 'Add a slide to this template',
			children: (
				<TextInput label="New Slide Title" ref={ newSlideInputRef } />
			),
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => {
				addInput({
					name: newSlideInputRef.current?.value,
				})
			},
		})
	}

	return (
		<>
			<Group>
				<Title order={ 3 }>Slides</Title>
				<Button onClick={ handleAddSlide }>+</Button>
			</Group>

			<Divider my="sm" />

			<Flex wrap="wrap" gap="sm">
				{ paths.map((path, i) => (
					<SlideCard
						key={ path }
						path={ path }
						removeInput={ () => removeInput(i) }
					/>
				)) }
			</Flex>

			<Title order={ 3 }>Rounds</Title>

			<Divider my="sm" />

		</>
	)
}

export default LayoutEditor
