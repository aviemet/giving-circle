import { modals } from "@mantine/modals"
import React, { useRef } from "react"
import { useDynamicInputs, useForm } from "use-inertia-form"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { TextInput } from "@/components/Inputs"
import { Routes } from "@/lib"

import SlideCard from "./SlideCard"

interface SlidesSectionProps {
	circle: Schema.CirclesInertiaShare
	template: Schema.TemplatesFormData
}

const SlidesSection = ({ circle, template }: SlidesSectionProps) => {
	const { getData } = useForm()

	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const { addInput, removeInput, paths } = useDynamicInputs({
		model: "slides",
		emptyData: {
			id: NaN,
			title: "",
			slides: [],
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

			<Divider mt="xs" mb="sm" />

			<Flex wrap="wrap" gap="sm">
				{ paths.map((path, i) => {
					const slug = getData(`template.${path}.slug`) as number

					return (
						<SlideCard
							key={ path }
							path={ path }
							removeInput={ () => removeInput(i) }
							href={ template.slug ? Routes.circleTemplatesEditSlide(circle.slug, template.slug, slug) : undefined }
						/>
					)
				}) }
			</Flex>

			<Title mt="sm" order={ 3 }>Actions</Title>

			<Divider mt="xs" mb="sm" />

		</>
	)
}

export default SlidesSection
