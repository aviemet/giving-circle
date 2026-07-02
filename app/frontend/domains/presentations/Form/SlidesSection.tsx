import { modals } from "@mantine/modals"
import set from "es-toolkit/compat/set"
import { useCallback, useRef, useState } from "react"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { useFormFieldContext } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { SlideFormCard } from "@/features/Cards"
import { Routes, flattenToPaths } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useCreatePresentationSlide } from "@/queries"


interface SlidesSectionProps {
	circle: Schema.CirclesInertiaShare
	presentation: Schema.PresentationsEdit
}

export const SlidesSection = ({ circle, presentation }: SlidesSectionProps) => {
	const { active_theme } = usePageProps()
	const { getFormData, setValue, clearPathsStartingWith } = useFormFieldContext()
	const [count, setCount] = useState(presentation.slides?.length ?? 0)
	const [slideSlugs, setSlideSlugs] = useState<string[]>(
		() => presentation.slides?.map((slide) => slide.slug) ?? [],
	)
	const isRecord = (value: unknown): value is Record<string, unknown> => (
		value !== null && typeof value === "object" && !Array.isArray(value)
	)

	const newSlideInputRef = useRef<HTMLInputElement>(null)
	const handleRemoveSlide = useCallback((removeIndex: number) => {
		const data = getFormData()
		const presentationObj = isRecord(data.presentation) ? data.presentation : {}
		const arr = Array.isArray(presentationObj.slides_attributes) ? presentationObj.slides_attributes : []
		const newArr = [...arr]
		newArr.splice(removeIndex, 1)
		set(data, "presentation.slides_attributes", newArr)
		clearPathsStartingWith("presentation.slides_attributes")
		const pathEntries = flattenToPaths({ presentation: { slides_attributes: newArr } })
		pathEntries.forEach(([path, val]) => setValue(path, val))
		setCount(newArr.length)
		setSlideSlugs((previous) => {
			const next = [...previous]
			next.splice(removeIndex, 1)
			return next
		})
	}, [getFormData, clearPathsStartingWith, setValue])

	const addPresentationSlideMutation = useCreatePresentationSlide({
		params: {
			circleSlug: circle.slug,
			presentationSlug: presentation.slug,
		},
		onSuccess(data, variables) {
			const nextIndex = count
			Object.entries(data).forEach(([key, value]) => setValue(`presentation.slides_attributes.${nextIndex}.${key}`, value))
			setCount(nextIndex + 1)
			if(typeof data.slug === "string" && data.slug.length > 0) {
				const newSlug = data.slug
				setSlideSlugs((previous) => [...previous, newSlug])
			}
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
				{ Array.from({ length: count }, (_, index) => (
					<SlideFormCard
						key={ index }
						path={ `presentation.slides_attributes.${index}` }
						removeInput={ () => handleRemoveSlide(index) }
						href={
							presentation.slug && slideSlugs[index]
								? Routes.editThemePresentationSlide(circle.slug, active_theme.slug, presentation.slug, slideSlugs[index])
								: undefined
						}
					/>
				)) }
			</Flex>


		</>
	)
}
