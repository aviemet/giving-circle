import { useState } from "react"
import { useTranslation } from "react-i18next"

import { ActionIcon, Box, Group, Slider, Text } from "@/components"
import { KeyboardIcon } from "@/components/Icons"
import { NumberInput } from "@/components/Inputs"

import * as classes from "./OrgVoteCard.css"

interface OrgVoteCardProps {
	orgName: string
	votes: number
	maxVotes: number
	onChange: (votes: number) => void
}

export function OrgVoteCard({
	orgName,
	votes,
	maxVotes,
	onChange,
}: OrgVoteCardProps) {
	const { t } = useTranslation()
	const [keyboardMode, setKeyboardMode] = useState(false)

	return (
		<Box className={ classes.card }>
			<Group className={ classes.header } justify="flex-end">
				<ActionIcon
					className={ classes.iconButton }
					variant="transparent"
					color="white"
					aria-label={ keyboardMode
						? t("presentations.interact.form.toggle_slider")
						: t("presentations.interact.form.toggle_keyboard") }
					aria-pressed={ keyboardMode }
					onClick={ () => setKeyboardMode((current) => !current) }
				>
					<KeyboardIcon size={ 22 } />
				</ActionIcon>
			</Group>

			<Text className={ classes.amount }>
				{ votes }
			</Text>

			{ keyboardMode
				? (
					<NumberInput
						className={ classes.numberInput }
						wrapper={ false }
						value={ votes }
						min={ 0 }
						max={ maxVotes }
						onChange={ (value) => {
							const next = typeof value === "number" ? value : Number(value)
							if(Number.isFinite(next)) {
								onChange(Math.round(next))
							}
						} }
					/>
				)
				: (
					<Slider
						className={ classes.slider }
						value={ votes }
						min={ 0 }
						max={ Math.max(maxVotes, 1) }
						step={ 1 }
						label={ null }
						onChange={ onChange }
					/>
				) }

			<Text className={ classes.orgName }>{ orgName }</Text>
		</Box>
	)
}
