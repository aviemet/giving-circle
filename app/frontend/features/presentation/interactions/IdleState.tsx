import { useTranslation } from "react-i18next"

import { Stack, Text, Title } from "@/components"

import * as classes from "./IdleState.css"

export function IdleState() {
	const { t } = useTranslation()

	return (
		<Stack className={ classes.root } gap="sm">
			<Title order={ 2 }>{ t("presentations.interact.idle.title") }</Title>
			<Text c="dimmed">{ t("presentations.interact.idle.body") }</Text>
		</Stack>
	)
}
