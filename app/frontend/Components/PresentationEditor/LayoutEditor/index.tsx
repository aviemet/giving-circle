import React, { useRef, useState } from 'react'
import { Button, Divider, Flex, Group, Text, Title } from '@/Components'
import { TextInput } from '@/Components/Inputs'
import SlideCard from './SlideCard'
import { useDynamicInputs, useForm } from 'use-inertia-form'
import { DynamicInputs } from '@/Components/Form'
import { modals } from '@mantine/modals'

const LayoutEditor = () => {
	const { getData, data } = useForm()

	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const { addInput, removeInput, paths } = useDynamicInputs({
		model: 'presentation_slides',
		emptyData: {
			title: '',
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
					title: newSlideInputRef.current?.value,
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
		</>
	)
}

export default LayoutEditor
