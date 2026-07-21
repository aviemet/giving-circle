import { useTranslation } from "react-i18next"

import { Badge, ButtonLink, Container, Divider, Group, Menu, Page, Section, Title } from "@/components"
import { HelpingIcon, OrgsIcon, PresentationIcon } from "@/components/Icons"
import { StatTile } from "@/domains/circles/StatTile"
import { CardContainer, OrgCard, PresentationCard, STATUS_BADGE_COLOR } from "@/features/Cards"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { intlLocale } from "@/lib/locale"

interface ShowThemeProps {
	theme: Schema.ThemesShow
}

function formatTotalAsk(theme: Schema.ThemesShow): string {
	const cents = theme.total_ask_cents ?? 0
	const currency = theme.total_ask_currency ?? "USD"
	const amount = cents / 100
	return new Intl.NumberFormat(intlLocale(), { style: "currency", currency }).format(amount)
}

// @path: /:circle_slug/themes/:theme_slug
// @route: theme
const ShowTheme = ({ theme }: ShowThemeProps) => {
	const { t } = useTranslation()
	const { params, active_circle } = usePageProps<"theme">()

	const title = theme.name || t("themes.show.default_title")

	if(!active_circle) return <></>

	return (
		<Page
			title={ title }
			heading={ <>
				<Group gap="sm">
					<Title>{ title }</Title>
					<Badge color={ STATUS_BADGE_COLOR[theme.status] } variant="light">
						{ theme.status }
					</Badge>
				</Group>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editTheme(params.circle_slug, params.theme_slug) }>
								{ t("themes.show.edit") }
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
			breadcrumbs={ [
				{ title: t("themes.show.breadcrumbs.circles"), href: Routes.circles() },
				{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: t("themes.show.breadcrumbs.themes"), href: Routes.circleThemes(params.circle_slug) },
				{ title, href: window.location.href },
			] }
		>
			<Container>
				<Section py="md">
					<Group grow>
						<StatTile
							heading={ t("themes.show.organizations") }
							value={ theme.orgs_count ?? theme.orgs.length }
							icon={ <OrgsIcon /> }
							color="green"
						/>
						<StatTile
							heading={ t("themes.show.total_ask") }
							value={ formatTotalAsk(theme) }
							icon={ <HelpingIcon /> }
							color="purple"
						/>
						<StatTile
							heading={ t("themes.show.presentations") }
							value={ theme.presentations_count ?? theme.presentations?.length ?? 0 }
							icon={ <PresentationIcon /> }
							color="orange"
						/>
						<StatTile
							heading={ t("themes.show.member_funds") }
							value={ t("themes.show.member_funds_placeholder") }
							icon={ <HelpingIcon /> }
							color="gray"
						/>
					</Group>
				</Section>

				{ /* Organizations */ }
				<Section mb="xl">
					<Group justify="space-between" my="xs">
						<Title order={ 2 }>{ t("themes.show.organizations") }</Title>
						<ButtonLink variant="subtle" href={ Routes.themeOrgs(params.circle_slug, params.theme_slug) }>
							{ t("themes.show.view_all") }
						</ButtonLink>
					</Group>
					<Divider my="xs" />
					<CardContainer>
						{ theme.orgs.map(org => (
							<OrgCard key={ org.id } org={ org } />
						)) }
					</CardContainer>
				</Section>

				{ /* Presentations */ }
				<Section mb="xl">
					<Group justify="space-between" my="xs">
						<Title order={ 2 }>{ t("themes.show.presentations") }</Title>
						<ButtonLink href={ Routes.newThemePresentation(params.circle_slug, params.theme_slug) }>
							{ t("themes.show.new_presentation") }
						</ButtonLink>
					</Group>
					<Divider my="xs" />
					<CardContainer>
						{ (theme.presentations ?? []).map(presentation => (
							<PresentationCard
								key={ presentation.id }
								presentation={ presentation }
								circleSlug={ params.circle_slug }
								themeSlug={ params.theme_slug }
							/>
						)) }
					</CardContainer>
				</Section>

			</Container>
		</Page>
	)
}

export default ShowTheme
