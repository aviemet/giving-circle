import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Stack, Text } from "@/components"
import { Switch } from "@/components/Inputs"
import { useTogglePresentationInteraction } from "@/queries"

import * as classes from "./InteractionToggles.css"

export interface InteractionToggleRow {
	id: string
	slug: string
	name: string
	accepting_responses: boolean
}

interface InteractionTogglesProps {
	circleSlug: string
	presentationSlug: string
	interactions: InteractionToggleRow[]
	cableInteractions?: Array<{
		id: string
		slug: string
		accepting_responses: boolean
	}>
}

interface PendingToggle {
	interactionSlug: string
	accepting_responses: boolean
}

function applyCable(
	rows: InteractionToggleRow[],
	cableInteractions: InteractionTogglesProps["cableInteractions"],
) {
	if(!cableInteractions) return rows

	return rows.map((interaction) => {
		const fromCable = cableInteractions.find((entry) => entry.id === interaction.id)
		if(!fromCable) return interaction

		return {
			...interaction,
			accepting_responses: fromCable.accepting_responses,
		}
	})
}

function applyPending(rows: InteractionToggleRow[], pending: PendingToggle | null) {
	if(!pending) return rows

	return rows.map((entry) => {
		if(entry.slug === pending.interactionSlug) {
			return { ...entry, accepting_responses: pending.accepting_responses }
		}
		if(pending.accepting_responses) {
			return { ...entry, accepting_responses: false }
		}
		return entry
	})
}

function cableMatchesSnapshot(
	snapshot: InteractionToggleRow[],
	cableInteractions: InteractionTogglesProps["cableInteractions"],
) {
	if(!cableInteractions) return false

	return snapshot.every((row) => {
		const fromCable = cableInteractions.find((entry) => entry.id === row.id)
		return fromCable !== undefined
			&& fromCable.accepting_responses === row.accepting_responses
	})
}

export function InteractionToggles({
	circleSlug,
	presentationSlug,
	interactions: serverInteractions,
	cableInteractions,
}: InteractionTogglesProps) {
	const { t } = useTranslation()
	const [pending, setPending] = useState<PendingToggle | null>(null)
	const [mutationSnapshot, setMutationSnapshot] = useState<InteractionToggleRow[] | null>(null)

	const interactions = useMemo(() => {
		const cableCaughtUp = mutationSnapshot !== null
			&& cableMatchesSnapshot(mutationSnapshot, cableInteractions)

		let rows = serverInteractions
		if(cableInteractions && (mutationSnapshot === null || cableCaughtUp)) {
			rows = applyCable(serverInteractions, cableInteractions)
		} else if(mutationSnapshot !== null) {
			rows = mutationSnapshot
		}

		return applyPending(rows, pending)
	}, [serverInteractions, cableInteractions, mutationSnapshot, pending])

	const { mutate, isPending } = useTogglePresentationInteraction({
		params: {
			circleSlug,
			presentationSlug,
		},
		onSuccess: (data) => {
			setMutationSnapshot(data.interactions)
			setPending(null)
		},
		onError: () => {
			setPending(null)
		},
	})

	const handleToggle = (interaction: InteractionToggleRow, checked: boolean) => {
		const nextPending = {
			interactionSlug: interaction.slug,
			accepting_responses: checked,
		}
		setPending(nextPending)
		mutate(nextPending)
	}

	if(interactions.length === 0) {
		return (
			<Text size="sm" c="dimmed">
				{ t("presentations.active.controls.no_interactions") }
			</Text>
		)
	}

	return (
		<Stack gap="sm" className={ classes.root }>
			{ interactions.map((interaction) => (
				<Switch
					key={ interaction.id }
					className={ classes.row }
					label={ interaction.name }
					checked={ interaction.accepting_responses }
					disabled={ isPending }
					wrapper={ false }
					style={ { padding: 0 } }
					onChange={ (event) => {
						handleToggle(interaction, event.currentTarget.checked)
					} }
				/>
			)) }
		</Stack>
	)
}
