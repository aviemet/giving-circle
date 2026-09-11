import clsx from "clsx"
import { useState } from "react"

import { Slider } from "@/components"
import { NumberInput } from "@/components/Inputs"

import { OrgAmountCard } from "./OrgAmountCard"
import * as classes from "./OrgAmountCard.css"

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
	const [keyboardMode, setKeyboardMode] = useState(false)

	return (
		<OrgAmountCard
			orgName={ orgName }
			amount={ votes }
			keyboardMode={ keyboardMode }
			onToggleKeyboard={ () => setKeyboardMode((current) => !current) }
		>
			{ keyboardMode
				? (
					<NumberInput
						className={ clsx(classes.numericInput) }
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
						className={ clsx(classes.slider) }
						value={ votes }
						min={ 0 }
						max={ Math.max(maxVotes, 1) }
						step={ 1 }
						label={ null }
						onChange={ onChange }
					/>
				) }
		</OrgAmountCard>
	)
}
