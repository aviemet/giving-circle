import { Link } from "@inertiajs/react"
import { type TFunction } from "i18next"
import { useTranslation } from "react-i18next"

import { Badge, Card, Group, Stack, Text } from "@/components"
import { Routes } from "@/lib"
import { datetime } from "@/lib/formatters"

import * as classes from "../Cards.css"

export const STATUS_BADGE_COLOR: Record<Schema.ThemesPersisted["status"], string> = {
	current: "green",
	future: "blue",
	draft: "gray",
	past: "dimmed",
} as const

interface ThemeCardProps {
	theme: Schema.ThemesPersisted
	metaLine?: string
}

export function ThemeCard({ theme, metaLine }: ThemeCardProps) {
	const { t } = useTranslation()
	const published = publishedLabel(theme, t)
	const circleSlug = theme.circle.slug

	if(!circleSlug) return <></>

	return (
		<Card
			shadow="sm"
			p="xl"
			radius="md"
			withBorder
			className={ classes.dashboardCard }
			component={ Link }
			href={ Routes.theme(circleSlug, theme.slug) }
		>
			<Stack gap="sm">
				<Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
					<Text fw={ 600 } size="lg" className={ classes.cardTitle }>
						{ theme.name }
					</Text>
					<Badge color={ STATUS_BADGE_COLOR[theme.status] } variant="light">
						{ t(`circles.index.themeStatus.${theme.status}`) }
					</Badge>
				</Group>

				{ metaLine && (
					<Text size="sm" c="dimmed" className={ classes.cardMetaLine }>
						{ metaLine }
					</Text>
				) }

				{ published && (
					<Text size="sm" c="dimmed">
						{ published }
					</Text>
				) }
			</Stack>
		</Card>
	)
}

function publishedLabel(theme: Schema.ThemesPersisted, t: TFunction): string | null {
	if(theme.status === "future") {
		return t("circles.index.themePublishedUpcoming")
	}

	if(!theme.published_at) return null

	return t("circles.index.themePublishedOn", {
		date: datetime.dateEnglish(theme.published_at),
	})
}
