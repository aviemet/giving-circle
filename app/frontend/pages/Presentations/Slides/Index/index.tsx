import { router } from "@inertiajs/react"
import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next"

import { Button, Group, Menu, Page, Section, Text, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { TextInput } from "@/components/Inputs"
import { CardContainer, SlideCard } from "@/features/Cards"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useCreatePresentationSlide } from "@/queries"

interface PresentationSlidesIndexProps {
	presentation: Schema.PresentationsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides
// @route: themePresentationSlides
const PresentationSlidesIndex = ({ presentation }: PresentationSlidesIndexProps) => {
	const { t } = useTranslation()
	const { params, active_circle, active_theme, active_presentation } = usePageProps<"themePresentationSlides">()
	const title = t("presentations.slides.index.title")

	const addSlideMutation = useCreatePresentationSlide({
		params: {
			circleSlug: params.circle_slug,
			presentationSlug: params.presentation_slug,
		},
		onSuccess() {
			router.reload({ only: ["presentation"] })
		},
	})

	if(!active_circle || !active_theme || !active_presentation) return <></>

	const handleAddSlide = () => {
		let slideTitle = ""

		modals.openConfirmModal({
			title: t("presentations.slides.index.addSlideModal.title"),
			children: (
				<TextInput
					label={ t("presentations.slides.index.addSlideModal.slideTitle") }
					data-autofocus
					onChange={ (event) => { slideTitle = event.currentTarget.value } }
				/>
			),
			labels: {
				confirm: t("presentations.slides.index.addSlideModal.confirm"),
				cancel: t("presentations.slides.index.addSlideModal.cancel"),
			},
			onConfirm: () => {
				if(slideTitle.length === 0) return

				addSlideMutation.mutate({ title: slideTitle })
			},
		})
	}

	const handleDeleteSlide = (slideSlug: string) => {
		router.delete(Routes.themePresentationSlide(
			params.circle_slug,
			params.theme_slug,
			params.presentation_slug,
			slideSlug,
		))
	}

	return (
		<Page
			title={ title }
			heading={ <>
				<Title>{ title }</Title>
				<Group>
					<Button onClick={ handleAddSlide } leftSection={ <NewIcon /> }>
						{ t("presentations.slides.index.addSlide") }
					</Button>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.themePresentationSettings(
								params.circle_slug,
								params.theme_slug,
								params.presentation_slug,
							) }>
								{ t("presentations.slides.index.settings") }
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
			breadcrumbs={ [
				{ title: t("presentations.slides.index.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("presentations.slides.index.breadcrumbs.themes"), href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: t("presentations.slides.index.breadcrumbs.presentations"), href: Routes.themePresentations(params.circle_slug, params.theme_slug) },
				{ title: active_presentation.name, href: Routes.themePresentation(params.circle_slug, params.theme_slug, params.presentation_slug) },
				{ title: t("presentations.slides.index.breadcrumbs.slides"), href: window.location.href },
			] }
		>
			<Section>
				{ presentation.slides.length === 0
					? (
						<Text c="dimmed">{ t("presentations.slides.index.emptySlides") }</Text>
					)
					: (
						<CardContainer>
							{ presentation.slides.map((slide) => (
								<SlideCard
									key={ slide.id }
									slide={ slide }
									editHref={ Routes.editThemePresentationSlide(
										params.circle_slug,
										params.theme_slug,
										params.presentation_slug,
										slide.slug,
									) }
									onDelete={ () => handleDeleteSlide(slide.slug) }
								/>
							)) }
						</CardContainer>
					) }
			</Section>
		</Page>
	)
}

export default PresentationSlidesIndex
