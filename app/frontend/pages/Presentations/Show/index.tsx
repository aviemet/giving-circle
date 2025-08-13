import { Group, Link, Menu, Page, Section, Title } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:slug
// @route: themePresentation
const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const { params, active_circle, active_theme } = usePageProps<"themePresentation">()
	const title = presentation.name || "Presentation"

	if(!active_circle || !active_theme) return <></>

	return (
		<Page
			title={ title }
			heading={ <>
				<Title>{ title }</Title>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editThemePresentation(params.circle_slug, params.theme_slug, presentation.slug) }>
								Edit Presentation
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
			breadcrumbs={ [
				{ title: "Circles", href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: "Themes", href: Routes.circleThemes(params.circle_slug) },
				{ title: active_theme.name, href: Routes.theme(params.circle_slug, params.theme_slug) },
				{ title: "Presentations", href: Routes.themePresentations(params.circle_slug, params.theme_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Section>
				<Link
					as="button"
					href={ Routes.themePresentationActivate(params.circle_slug, params.theme_slug, presentation.slug) }
				>
					{ presentation.active ? "Resume" : "Start" } Presentation
				</Link>
			</Section>
		</Page>
	)
}

export default ShowPresentation
