import clsx from "clsx"
import { useTranslation } from "react-i18next"

import { Box, Text, Title } from "@/components"

import * as classes from "./IdleState.css"

export function IdleState() {
	const { t } = useTranslation()

	return (
		<Box className={ clsx(classes.page) }>
			<Box className={ clsx(classes.shell) }>
				<Title order={ 2 }>{ t("presentations.interact.idle.title") }</Title>
				<Text c="dimmed">{ t("presentations.interact.idle.body") }</Text>
			</Box>
		</Box>
	)
}
