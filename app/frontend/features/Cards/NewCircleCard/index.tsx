import { Link } from "@inertiajs/react"
import { useTranslation } from "react-i18next"

import { Card, Center, Stack, Text } from "@/components"
import { PlusCircleIcon } from "@/components/Icons"
import { Routes, rem } from "@/lib"

import * as classes from "./NewCircleCard.css"

export function NewCircleCard() {
	const { t } = useTranslation()

	return (
		<Card
			shadow="sm"
			p="lg"
			radius="md"
			withBorder
			component={ Link }
			href={ Routes.newCircle() }
			className={ classes.newCircleCard }
		>
			<Center h="100%">
				<Stack gap="xs" align="center">
					<PlusCircleIcon style={ { width: rem(32), height: rem(32) } } aria-hidden />
					<Text fw={ 500 }>{ t("circles.index.newCircleCard") }</Text>
				</Stack>
			</Center>
		</Card>
	)
}
