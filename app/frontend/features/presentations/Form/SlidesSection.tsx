import { modals } from "@mantine/modals"
import React, { useRef } from "react"
import { useDynamicInputs, useForm } from "use-inertia-form"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { TextInput } from "@/components/Inputs"
import { SlideFormCard } from "@/features/Cards"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useCreatePresentationSlide } from "@/queries"


const emptySlideData: Partial<Schema.Slide> = {
	id: "",
	title: "",
	data: {},
}

interface SlidesSectionProps {
	circle: Schema.CirclesInertiaShare
	presentation: Schema.PresentationsEdit
}

const SlidesSection = ({ circle, presentation }: SlidesSectionProps) => {
	const { active_theme } = usePageProps()

	const { getData } = useForm()

	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const { addInput, removeInput, paths } = useDynamicInputs({
		model: "slides",
		emptyData: emptySlideData,
	})

	const addPresentationSlideMutation = useCreatePresentationSlide({
		params: {
			circleSlug: circle.slug,
			presentationSlug: presentation.slug,
		},
		onSuccess(data, variables) {
			addInput(data)
		},
	})

	const handleAddSlide = () => {
		modals.openConfirmModal({
			title: "Add a slide to this presentation",
			children: (
				<TextInput label="New Slide Title" ref={ newSlideInputRef } />
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onConfirm: () => {
				addPresentationSlideMutation.mutate({
					title: newSlideInputRef.current!.value,
				})
			},
		})
	}

	if(!active_theme) return <></>

	return (
		<>
			<Group>
				<Title order={ 3 }>Slides</Title>
				<Button onClick={ handleAddSlide }>+</Button>
			</Group>

			<Divider mt="xs" mb="sm" />

			<Flex wrap="wrap" gap="sm">
				{ paths.map((path, i) => {
					const slug = getData(`presentation.${path}.slug`) as number

					return (
						<SlideFormCard
							key={ path }
							path={ path }
							removeInput={ () => removeInput(i) }
							href={ presentation.slug ? Routes.editThemePresentationSlide(circle.slug, active_theme.slug, presentation.slug, slug) : undefined }
						/>
					)
				}) }
			</Flex>


		</>
	)
}

export default SlidesSection
