import { router } from "@inertiajs/react"
import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next"

import { Button, ButtonLink, Group, Menu, Page, Section, Stack, Text, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { TextInput } from "@/components/Inputs"
import { CardContainer, SlideCard } from "@/features/Cards"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useCreateTemplateSlide } from "@/queries"

interface ShowTemplateProps {
	template: Schema.TemplatesShow
}

// @path: /:circle_slug/templates/:slug
// @route: circleTemplate
const ShowTemplate = ({ template }: ShowTemplateProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"circleTemplate">()

	const addSlideMutation = useCreateTemplateSlide({
		params: { circleSlug: params.circle_slug, templateSlug: template.slug },
		onSuccess() {
			router.reload({ only: ["template"] })
		},
	})

	if(!active_circle) return <></>

	const title = template.name || t("templates.show.defaultTitle")

	const handleAddSlide = () => {
		let slideTitle = ""

		modals.openConfirmModal({
			title: t("templates.show.addSlideModal.title"),
			children: (
				<TextInput
					label={ t("templates.show.addSlideModal.slideTitle") }
					onChange={ (event) => { slideTitle = event.currentTarget.value } }
				/>
			),
			labels: {
				confirm: t("templates.show.addSlideModal.confirm"),
				cancel: t("templates.show.addSlideModal.cancel"),
			},
			onConfirm: () => {
				if(slideTitle.length === 0) return

				addSlideMutation.mutate({ title: slideTitle })
			},
		})
	}

	return (
		<Page
			title={ title }
			heading={ <>
				<Title>{ title }</Title>
				<Group>
					<Button onClick={ handleAddSlide } leftSection={ <NewIcon /> }>
						{ t("templates.show.addSlide") }
					</Button>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleTemplate(template.circle.slug, template.slug) }>
								{ t("templates.show.settings") }
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
			breadcrumbs={ [
				{ title: t("templates.show.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("templates.show.breadcrumbs.templates"), href: Routes.circleTemplates(params.circle_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<Stack gap="md">
					<Group>
						<ButtonLink href={ Routes.editCircleTemplate(template.circle.slug, template.slug) }>
							{ t("templates.show.settings") }
						</ButtonLink>
					</Group>

					{ template.slides.length === 0
						? (
							<Text c="dimmed">{ t("templates.show.emptySlides") }</Text>
						)
						: (
							<CardContainer>
								{ template.slides.map((slide) => (
									<SlideCard
										key={ slide.id }
										slide={ slide }
										editHref={ Routes.circleTemplatesEditSlide(
											params.circle_slug,
											template.slug,
											slide.slug,
										) }
									/>
								)) }
							</CardContainer>
						) }
				</Stack>
			</Section>
		</Page>
	)
}

export default ShowTemplate
