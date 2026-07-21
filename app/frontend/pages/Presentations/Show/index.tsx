import { router } from "@inertiajs/react"
import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next"

import { Badge, Button, ButtonLink, Group, Link, Menu, Page, Section, Stack, Text, Title } from "@/components"
import { TextInput } from "@/components/Inputs"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useSyncPresentationTemplateSlides } from "@/queries"

interface ShowPresentationProps {
	presentation: Schema.PresentationsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug
// @route: themePresentation
const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const { t } = useTranslation()
	const { params, active_circle, active_theme } = usePageProps<"themePresentation">()

	const syncSlidesMutation = useSyncPresentationTemplateSlides({
		params: { circleSlug: params.circle_slug, presentationSlug: presentation.slug },
	})

	if(!active_circle || !active_theme) return <></>

	const handlePresentationAction = () => {
		if(presentation.active) {
			router.visit(Routes.themePresentationControls(
				params.circle_slug,
				params.theme_slug,
				presentation.slug,
			))
			return
		}

		modals.openConfirmModal({
			title: t("presentations.show.startModal.title"),
			children: (
				<Text size="sm">
					{ t("presentations.show.startModal.body") }
				</Text>
			),
			labels: {
				confirm: t("presentations.show.startModal.confirm"),
				cancel: t("presentations.show.cancel"),
			},
			onConfirm: () => {
				router.post(Routes.themePresentationActivate(
					params.circle_slug,
					params.theme_slug,
					presentation.slug,
				))
			},
		})
	}

	const openSaveAsNewTemplateModal = () => {
		let templateName = t("presentations.show.saveAsNewTemplateModal.defaultTemplateName", {
			name: presentation.name,
		})

		modals.openConfirmModal({
			title: t("presentations.show.saveAsNewTemplateModal.title"),
			children: (
				<TextInput
					label={ t("presentations.show.saveAsNewTemplateModal.templateName") }
					defaultValue={ templateName }
					onChange={ (event) => { templateName = event.currentTarget.value } }
				/>
			),
			labels: {
				confirm: t("presentations.show.saveAsNewTemplateModal.confirm"),
				cancel: t("presentations.show.cancel"),
			},
			onConfirm: () => {
				router.post(
					Routes.themePresentationSaveAsTemplate(
						params.circle_slug,
						params.theme_slug,
						presentation.slug,
					),
					{ name: templateName, mode: "new" },
				)
			},
		})
	}

	const openUpdateSourceTemplateModal = () => {
		if(!presentation.template) return

		modals.openConfirmModal({
			title: t("presentations.show.updateSourceTemplateModal.title"),
			children: (
				<Text size="sm">
					{ t("presentations.show.updateSourceTemplateModal.body", {
						templateName: presentation.template.name,
					}) }
				</Text>
			),
			labels: {
				confirm: t("presentations.show.updateSourceTemplateModal.confirm"),
				cancel: t("presentations.show.cancel"),
			},
			confirmProps: { color: "red" },
			onConfirm: () => {
				router.post(
					Routes.themePresentationSaveAsTemplate(
						params.circle_slug,
						params.theme_slug,
						presentation.slug,
					),
					{ mode: "update_source" },
				)
			},
		})
	}

	const openSyncFromTemplateModal = () => {
		if(!presentation.template_id) return

		modals.openConfirmModal({
			title: t("presentations.show.syncFromTemplateModal.title"),
			children: (
				<Text size="sm">
					{ t("presentations.show.syncFromTemplateModal.body") }
				</Text>
			),
			labels: {
				confirm: t("presentations.show.syncFromTemplateModal.confirm"),
				cancel: t("presentations.show.cancel"),
			},
			confirmProps: { color: "red" },
			onConfirm: () => {
				syncSlidesMutation.mutate(null)
			},
		})
	}

	const title = presentation.name || t("presentations.show.defaultTitle")
	const slideCount = presentation.slides_count ?? presentation.slides?.length ?? 0

	return (
		<Page
			title={ title }
			heading={ <>
				<Group gap="sm">
					<Title>{ title }</Title>
					{ presentation.active
						? (
							<Badge color="green" variant="light">{ t("presentations.show.active") }</Badge>
						)
						: (
							<Badge color="gray" variant="light">{ t("presentations.show.inactive") }</Badge>
						) }
				</Group>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.themePresentationSettings(params.circle_slug, params.theme_slug, presentation.slug) }>
								{ t("presentations.show.settings") }
							</Menu.Link>
							<Menu.Item onClick={ openSaveAsNewTemplateModal }>
								{ t("presentations.show.saveAsNewTemplateModal.title") }
							</Menu.Item>
							{ presentation.template && (
								<Menu.Item onClick={ openUpdateSourceTemplateModal }>
									{ t("presentations.show.updateSourceTemplateModal.title") }
								</Menu.Item>
							) }
							{ presentation.template_id && (
								<Menu.Item onClick={ openSyncFromTemplateModal }>
									{ t("presentations.show.syncFromTemplateModal.title") }
								</Menu.Item>
							) }
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
			breadcrumbs={ [
				{ title: t("presentations.show.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("presentations.show.breadcrumbs.themes"), href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: t("presentations.show.breadcrumbs.presentations"), href: Routes.themePresentations(params.circle_slug, params.theme_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<Stack gap="md">
					{ presentation.template && (
						<Text size="sm" c="dimmed">
							{ t("presentations.show.basedOnTemplate") }{ " " }
							<Link href={ Routes.circleTemplate(params.circle_slug, presentation.template.slug) }>
								{ presentation.template.name }
							</Link>
						</Text>
					) }

					<Text size="sm" c="dimmed">
						{ slideCount === 1
							? t("presentations.show.slidesCount_one")
							: t("presentations.show.slidesCount_other", { count: slideCount }) }
					</Text>

					<Group>
						<Button onClick={ handlePresentationAction }>
							{ presentation.active
								? t("presentations.show.resumePresentation")
								: t("presentations.show.startPresentation") }
						</Button>
						<ButtonLink
							variant="default"
							href={ Routes.themePresentationSlides(
								params.circle_slug,
								params.theme_slug,
								presentation.slug,
							) }
						>
							{ t("presentations.show.slides") }
						</ButtonLink>
						<ButtonLink
							variant="default"
							href={ Routes.themePresentationInteractions(
								params.circle_slug,
								params.theme_slug,
								presentation.slug,
							) }
						>
							Interactions
						</ButtonLink>
						<ButtonLink
							variant="subtle"
							href={ Routes.themePresentationSettings(params.circle_slug, params.theme_slug, presentation.slug) }
						>
							{ t("presentations.show.settings") }
						</ButtonLink>
					</Group>
				</Stack>
			</Section>
		</Page>
	)
}

export default ShowPresentation
