import clsx from "clsx"
import { type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { ActionIcon, Box, Group, Text } from "@/components"
import { KeyboardIcon } from "@/components/Icons"

import * as classes from "./OrgAmountCard.css"

interface OrgAmountCardProps {
	orgName: string
	amount: ReactNode
	keyboardMode: boolean
	onToggleKeyboard: () => void
	headerEnd?: ReactNode
	children: ReactNode
}

export function OrgAmountCard({
	orgName,
	amount,
	keyboardMode,
	onToggleKeyboard,
	headerEnd,
	children,
}: OrgAmountCardProps) {
	const { t } = useTranslation()

	return (
		<Box className={ clsx(classes.card) }>
			<Group
				className={ clsx(classes.header) }
				justify={ headerEnd === undefined ? "flex-end" : "space-between" }
			>
				<ActionIcon
					className={ clsx(classes.iconButton) }
					variant="transparent"
					color="white"
					aria-label={ keyboardMode
						? t("presentations.interact.form.toggle_slider")
						: t("presentations.interact.form.toggle_keyboard") }
					aria-pressed={ keyboardMode }
					onClick={ onToggleKeyboard }
				>
					<KeyboardIcon size={ 22 } />
				</ActionIcon>
				{ headerEnd }
			</Group>

			<Text className={ clsx(classes.amount) }>
				{ amount }
			</Text>

			{ children }

			<Text className={ clsx(classes.orgName) }>{ orgName }</Text>
		</Box>
	)
}
