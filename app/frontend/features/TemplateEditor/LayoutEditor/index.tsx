import { modals } from "@mantine/modals"
import React, { useRef } from "react"
import { useDynamicInputs, useForm } from "use-inertia-form"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { TextInput } from "@/components/Inputs"
import { Routes } from "@/lib"

import SlideCard from "../../templates/Form/SlideCard"

interface LayoutEditorProps {
	circle: Schema.CirclesInertiaShare
	template: Schema.TemplatesFormData
}

const LayoutEditor = ({ circle, template }: LayoutEditorProps) => {
	const { getData, data } = useForm()

	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const { addInput, removeInput, paths } = useDynamicInputs({
		model: "slides",
		emptyData: {
			name: "",
			order: NaN,
			content: "",
		},
	})

	const handleAddSlide = () => {
		modals.openConfirmModal({
			title: "Add a slide to this template",
			children: (
				<TextInput label="New Slide Title" ref={ newSlideInputRef } />
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
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

			<Divider mt="xs" mb="sm" />

			<Flex wrap="wrap" gap="sm">
				{ paths.map((path, i) => {
					const id = getData(`template.${path}.id`)

					return (
						<SlideCard
							key={ path }
							path={ path }
							removeInput={ () => removeInput(i) }
							href={ template.slug ? Routes.circleTemplatesEditSlide(circle.slug, template.slug, id) : undefined }
						/>
					)
				}) }
			</Flex>

			<Title mt="sm" order={ 3 }>Actions</Title>

			<Divider mt="xs" mb="sm" />

		</>
	)
}

export default LayoutEditor
