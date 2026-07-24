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
	const className = [
		classes.card,
		selected ? classes.selected : "",
		fullyFunded ? classes.funded : "",
	].filter(Boolean).join(" ")

	return (
		<button
			type="button"
			className={ className }
			disabled={ disabled }
			aria-pressed={ selected }
			onClick={ onToggle }
		>
			{ fullyFunded ? <span className={ classes.star } aria-hidden="true">*</span> : null }
			<span className={ classes.name }>{ orgName }</span>
		</button>
	)
}
