import { modals } from "@mantine/modals"
import { useRef } from "react"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { TextInput } from "@/components/Inputs"
import { SlideCard } from "@/features/Cards"

interface LayoutEditorProps {
	template: Schema.TemplatesFormData
}

const LayoutEditor = ({ template }: LayoutEditorProps) => {
	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const handleAddSlide = () => {
		modals.openConfirmModal({
			title: "Add a slide to this template",
			children: (
				<TextInput label="New Slide Title" ref={ newSlideInputRef } />
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
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
				{ template.slides?.map((slide) => (
					<SlideCard key={ slide.id } slide={ slide } />
				)) }
			</Flex>

			<Title mt="sm" order={ 3 }>Actions</Title>

			<Divider mt="xs" mb="sm" />

		</>
	)
}

export { LayoutEditor }
