import { useTranslation } from "react-i18next"

import { Container, Group, Title, Menu, Page, Section } from "@/components"
import { CoinsIcon, HelpingIcon, MembersIcon } from "@/components/Icons"
import { StatTile } from "@/domains/circles/StatTile"
import { CardContainer, ThemeCard } from "@/features/Cards"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface ShowCircleProps {
	circle: Schema.CirclesShow
}

// @path: /:circle_slug
// @route: circle
const ShowCircle = ({ circle }: ShowCircleProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"circle">()
	const title = circle.name || "Circle"

	return (
		<Page
			title={ circle.name }
			heading={ (
				<Group justify="space-between">
					<Title>{ circle.name }</Title>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircle(params.circle_slug) }>
								{ t("circles.show.editCircle") }
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			) }
			breadcrumbs={ [
				{ title: t("navigation.circles"), href: Routes.circles() },
				{ title, href: Routes.circle(params.circle_slug) },
			] }
		>
			<Section>
				<Container>
					<Section py="md">
						<Group grow>
							<StatTile
								heading={ t("circles.show.totalDonated") }
								value="$10"
								icon={ <CoinsIcon /> }
								color="purple"
							/>
							<StatTile
								heading={ t("circles.show.organizationsFunded") }
								value="6"
								icon={ <HelpingIcon /> }
								color="green"
							/>
							<StatTile
								heading={ t("circles.show.activeMembers") }
								value={ circle.memberships.length }
								icon={ <MembersIcon /> }
								color="orange"
							/>
						</Group>
					</Section>

					<Title order={ 2 }>{ t("circles.show.upcomingThemes") }</Title>
					<CardContainer>
						{ circle.themes.map(theme => (
							<ThemeCard key={ theme.id } theme={ theme } />
						)) }
					</CardContainer>
				</Container>
			</Section>
		</Page>
	)
}

export default ShowCircle
