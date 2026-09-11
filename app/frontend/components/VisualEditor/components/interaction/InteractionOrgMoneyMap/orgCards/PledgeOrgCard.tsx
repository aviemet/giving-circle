import clsx from "clsx"

import { Text, UnstyledButton } from "@/components"

import * as classes from "./PledgeOrgCard.css"

interface PledgeOrgCardProps {
	orgName: string
	selected: boolean
	fullyFunded: boolean
	disabled?: boolean
	onToggle: () => void
}

export function PledgeOrgCard({
	orgName,
	selected,
	fullyFunded,
	disabled = false,
	onToggle,
}: PledgeOrgCardProps) {
	return (
		<UnstyledButton
			className={ clsx(
				classes.card,
				selected && classes.selected,
				fullyFunded && classes.funded,
			) }
			disabled={ disabled }
			aria-pressed={ selected }
			onClick={ onToggle }
		>
			{ fullyFunded
				? (
					<Text className={ clsx(classes.star) } aria-hidden="true" component="span">*</Text>
				)
				: null }
			<Text className={ clsx(classes.name) } component="span">{ orgName }</Text>
		</UnstyledButton>
	)
}
