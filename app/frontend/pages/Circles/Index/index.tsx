import { useTranslation } from "react-i18next"

import { Container, Divider, Group, Link, Page, Section, Stack, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { CardContainer, CircleCard, NewCircleCard, ThemeCard } from "@/features/Cards"
import { Routes } from "@/lib"

const dashboardGridCols = { xs: 1, sm: 1, md: 2, lg: 2, xl: 3 } as const

interface CircleIndexProps {
	circles: Schema.CirclesIndex[]
	recent_themes: Schema.ThemesDashboard[]
}

// @path: /circles
// @route: circles
const CirclesIndex = ({ circles, recent_themes }: CircleIndexProps) => {
	const { t } = useTranslation()
	const hasCircles = circles.length > 0

	return (
		<Page
			title={ t("circles.index.title") }
			heading={ null }
			hideNavMenu
		>
			<Section>
				<Container>
					<Stack gap="xl">

						<Stack gap="md">
							<Group justify="space-between" align="center">
								<Title order={ 2 }>{ t("circles.index.circlesSectionTitle") }</Title>
								<Link as="button" href={ Routes.newCircle() } aria-label={ t("circles.index.newCircle") }>
									<NewIcon />
									{ t("circles.index.newCircle") }
								</Link>
							</Group>

							<Divider />

							{ hasCircles && (
								<CardContainer cols={ dashboardGridCols }>
									{ circles.map(circle => (
										<CircleCard key={ circle.id } circle={ circle } />
									)) }
								</CardContainer>
							) }

							{ !hasCircles && (
								<CardContainer>
									<NewCircleCard />
								</CardContainer>
							) }
						</Stack>

						{ recent_themes.length > 0 && (
							<Stack gap="md">
								<Title order={ 2 }>{ t("circles.index.recentThemesTitle") }</Title>

								<Divider />

								<CardContainer cols={ dashboardGridCols }>
									{ recent_themes.map(theme => (
										<ThemeCard
											key={ theme.id }
											theme={ theme }
											metaLine={ theme.circle.name }
										/>
									)) }
								</CardContainer>
							</Stack>
						) }
					</Stack>
				</Container>
			</Section>
		</Page>
	)
}

export default CirclesIndex
