import { Link } from "@inertiajs/react"

import { Badge, Card, Group, Stack, Text } from "@/components"
import { Routes } from "@/lib"

import * as classes from "../Cards.css"

interface PresentationCardProps {
	presentation: Schema.ThemesPresentationsSummary
	circleSlug: string
	themeSlug: string
}

export function PresentationCard({ presentation, circleSlug, themeSlug }: PresentationCardProps) {
	if(!presentation.slug) return <></>

	return (
		<Card
			shadow="sm"
			p="xl"
			radius="md"
			withBorder
			className={ classes.dashboardCard }
			component={ Link }
			href={ Routes.themePresentation(circleSlug, themeSlug, presentation.slug) }
		>
			<Stack gap="sm">
				<Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
					<Text fw={ 600 } size="lg" className={ classes.cardTitle }>
						{ presentation.name }
					</Text>
					{ presentation.active && (
						<Badge color="green" variant="light">
							Active
						</Badge>
					) }
				</Group>

				<Text size="sm" c="dimmed">
					{ presentation.slides_count } { presentation.slides_count === 1 ? "slide" : "slides" }
				</Text>
			</Stack>
		</Card>
	)
}
