import { Link } from "@inertiajs/react"
import { useTranslation } from "react-i18next"

import { Avatar, Card, Group, Stack, Text } from "@/components"
import { Routes } from "@/lib"

import * as classes from "../Cards.css"

interface CircleCardProps {
	circle: Schema.CirclesIndex
}

function circleInitial(name: string): string {
	const trimmed = name.trim()
	if(trimmed.length === 0) return "?"

	return trimmed.charAt(0).toUpperCase()
}

export function CircleCard({ circle }: CircleCardProps) {
	const { t } = useTranslation()

	return (
		<Card
			shadow="sm"
			p="xl"
			radius="md"
			withBorder
			className={ classes.dashboardCard }
			component={ Link }
			href={ Routes.circle(circle.slug) }
		>
			<Group wrap="nowrap" align="flex-start" gap="lg">
				<Avatar color="pink" radius="md" size="xl">
					{ circleInitial(circle.name) }
				</Avatar>

				<Stack gap="sm" style={ { flex: 1, minWidth: 0 } }>
					<Text fw={ 600 } size="lg" className={ classes.cardTitle }>
						{ circle.name }
					</Text>
					<Text size="sm" c="dimmed">
						{ circle.memberships_count === 1
							? t("circles.index.membersCount_one")
							: t("circles.index.membersCount_other", { count: circle.memberships_count }) }
					</Text>
					<Text size="sm" c="dimmed" className={ classes.cardMetaLine }>
						{ t("circles.index.totalGivenPlaceholder") }
					</Text>
				</Stack>
			</Group>
		</Card>
	)
}
