import { modals } from "@mantine/modals"
import set from "es-toolkit/compat/set"
import { useCallback, useRef, useState } from "react"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { useFormFieldContext } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { SlideFormCard } from "@/features/Cards"
import { flattenToPaths, Routes } from "@/lib"
import { useCreateTemplateSlide } from "@/queries"

interface SlidesSectionProps {
	circle: Schema.CirclesPersisted
	template: Schema.TemplatesEdit
}

export const SlidesSection = ({ circle, template }: SlidesSectionProps) => {
	const newSlideInputRef = useRef<HTMLInputElement>(null)
	const { getFormData, setValue, clearPathsStartingWith } = useFormFieldContext()
	const [count, setCount] = useState(template.slides?.length ?? 0)

	const isRecord = (value: unknown): value is Record<string, unknown> => (
		value !== null && typeof value === "object" && !Array.isArray(value)
	)

	const handleRemoveSlide = useCallback((removeIndex: number) => {
		const data = getFormData()
		const templateObj = isRecord(data.template) ? data.template : {}
		const arr = Array.isArray(templateObj.slides_attributes) ? templateObj.slides_attributes : []
		const newArr = [...arr]
		newArr.splice(removeIndex, 1)
		set(data, "template.slides_attributes", newArr)
		clearPathsStartingWith("template.slides_attributes")
		const pathEntries = flattenToPaths({ template: { slides_attributes: newArr } })
		pathEntries.forEach(([path, val]) => setValue(path, val))
		setCount(newArr.length)
	}, [getFormData, clearPathsStartingWith, setValue])

	const addTemplateSlideMutation = useCreateTemplateSlide({
		params: {
			circleSlug: circle.slug,
			templateSlug: template.slug,
		},
		onSuccess(data, variables) {
			const nextIndex = count
			Object.entries(data).forEach(([key, value]) => setValue(`template.slides_attributes.${nextIndex}.${key}`, value))
			setCount(nextIndex + 1)
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
				{ Array.from({ length: count }, (_, index) => (
					<SlideFormCard
						key={ index }
						path={ `template.slides_attributes.${index}` }
						removeInput={ () => handleRemoveSlide(index) }
						href={ template.slug ? Routes.circleTemplatesEditSlide(circle.slug, template.slug, String(index)) : undefined }
					/>
				)) }
			</Flex>
		</>
	)
}
