import { modals } from "@mantine/modals"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

import { Button, Divider, Flex, Group, Title } from "@/components"
import { TextInput } from "@/components/Inputs"
import { SlideCard } from "@/features/Cards"

interface LayoutEditorProps {
	template: Schema.TemplatesFormData
}

function isPersistedSlide(slide: Schema.SlidesFormData): slide is Schema.SlidesShow {
	return slide.id !== undefined
}

export const LayoutEditor = ({ template }: LayoutEditorProps) => {
	const { t } = useTranslation()
	const newSlideInputRef = useRef<HTMLInputElement>(null)

	const handleAddSlide = () => {
		modals.openConfirmModal({
			title: t("slides.form.add_to_template"),
			children: (
				<TextInput label={ t("slides.form.new_slide_title") } ref={ newSlideInputRef } />
			),
			labels: { confirm: t("common.actions.confirm"), cancel: t("common.actions.cancel") },
		})
	}

	return (
		<>
			<Group>
				<Title order={ 3 }>{ t("spotlight.slides") }</Title>
				<Button onClick={ handleAddSlide }>+</Button>
			</Group>

			<Divider mt="xs" mb="sm" />

			<Flex wrap="wrap" gap="sm">
				{ template.slides?.filter(isPersistedSlide).map((slide) => (
					<SlideCard key={ slide.id } slide={ slide } editHref="#" />
				)) }
			</Flex>

			<Title mt="sm" order={ 3 }>{ t("spotlight.actions") }</Title>

			<Divider mt="xs" mb="sm" />

		</>
	)
}
