import { modals } from "@mantine/modals"
import { useRef } from "react"
import { useDynamicInputs, useForm } from "use-inertia-form"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { TextInput } from "@/components/Inputs"
import { SlideFormCard } from "@/features/Cards"
import { Routes } from "@/lib"
import { useCreateTemplateSlide } from "@/queries"


const emptySlideData: Partial<Schema.Slide> = {
	id: "",
	title: "",
	data: {},
}

interface SlidesSectionProps {
	circle: Schema.CirclesPersisted
	template: Schema.TemplatesEdit
}

const SlidesSection = ({ circle, template }: SlidesSectionProps) => {
	const { getData } = useForm()

	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const { addInput, removeInput, paths } = useDynamicInputs({
		model: "slides",
		emptyData: emptySlideData,
	})

	const addTemplateSlideMutation = useCreateTemplateSlide({
		params: {
			circleSlug: circle.slug,
			templateSlug: template.slug,
		},
		onSuccess(data, variables) {
			addInput(data)
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
				addTemplateSlideMutation.mutate({
					title: newSlideInputRef.current!.value,
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
						<SlideFormCard
							key={ path }
							path={ path }
							removeInput={ () => removeInput(i) }
							href={ template.slug ? Routes.circleTemplatesEditSlide(circle.slug, template.slug, slug) : undefined }
						/>
					)
				}) }
			</Flex>
		</>
	)
}

export default SlidesSection
