import { Divider, NavLink, Text } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

export function PresentationSidebarMenu() {
	const { active_circle, active_theme, active_presentation } = usePageProps()

	return (
		<>{ active_circle && active_theme && active_presentation && <>
			<NavLink href={ Routes.themePresentationControls(active_circle.slug, active_theme.slug, active_presentation.slug) }>Controls</NavLink>
			<NavLink href={ Routes.themePresentationOverview(active_circle.slug, active_theme.slug, active_presentation.slug) }>Overview</NavLink>
			<NavLink href="">Members</NavLink>

			<Divider />

			<NavLink href="">Messaging</NavLink>

			<Divider />

			<Text size="xs" tt="uppercase" c="dimmed" fw={ 500 } px="md" py="xs">
				Links
			</Text>
			<NavLink
				href={ Routes.circlePublicPresentation(active_circle.slug, active_presentation.slug) }
				target="_blank"
				rel="noreferrer"
				active={ false }
			>
				Presentation
			</NavLink>
		</> }</>
	)
}
