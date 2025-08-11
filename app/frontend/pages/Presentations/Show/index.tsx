import { Group, Link, Menu, Page, Section, Title } from "@/components"
import { Routes, withLayout } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowPresentationProps {
	presentation: Schema.PresentationsPresentation
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:slug
// @route: themePresentation
const ShowPresentation = ({ presentation }: ShowPresentationProps) => {
	const { params } = usePageProps<"themePresentation">()
	const title = presentation.name || "Presentation"

	return (
		<Page
			title={ title }
			siteTitle={ <>
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
