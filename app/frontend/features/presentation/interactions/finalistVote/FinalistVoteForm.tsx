import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, SimpleGrid, Stack, Text, Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { Checkbox, HiddenInput } from "@/components/Inputs"
import { interactionConfigFrom } from "@/domains/presentation/interactions/Form/interactionConfig"
import {
	interactionFormContextFrom,
	responseDataFrom,
	type OrgMoneyMapEntry,
} from "@/domains/presentation/interactions/Form/ResponseFields"
import { Routes } from "@/lib"

import { OrgVoteCard } from "./OrgVoteCard"
import {
	allocationAmountsFromEntries,
	allocationEntriesFromAmounts,
	canFinalizeVote,
	clampOrgAmountCents,
	orgSliderMaxCents,
	remainingCents,
	type AllocationAmounts,
} from "../allocation/allocationBudget"
import * as classes from "../allocation/AllocationVoteForm.css"
import { type MemberInteractionUiProps } from "../memberInteractionUi"

const VOTES_FIELD_KEY = "votes"

type FormPayload = {
	presentation_interaction_response: {
		response_data: Record<string, OrgMoneyMapEntry[]>
	}
}

function initialAmounts(
	orgIds: string[],
	responseData: unknown,
	fieldKey: string,
): AllocationAmounts {
	const parsed = responseDataFrom(responseData)
	const value = parsed[fieldKey]
	const entries = Array.isArray(value)
		? value.filter((entry): entry is OrgMoneyMapEntry => {
			return typeof entry === "object"
			&& entry !== null
			&& !Array.isArray(entry)
			&& "org_id" in entry
			&& "amount_cents" in entry
			&& typeof entry.org_id === "string"
			&& typeof entry.amount_cents === "number"
		})
		: undefined

	return allocationAmountsFromEntries(orgIds, entries)
}

export function FinalistVoteForm({
	circleSlug,
	presentationSlug,
	activeInteraction,
	responseData,
	availableVotes,
}: MemberInteractionUiProps) {
	const { t } = useTranslation()
	const config = interactionConfigFrom(activeInteraction.config)
	const votesField = config.fields.find((field) => {
		return field.key === VOTES_FIELD_KEY && field.type === "org_money_map"
	})
	const formContext = interactionFormContextFrom(activeInteraction.context)
	const orgs = useMemo(
		() => formContext.presentation_orgs ?? [],
		[formContext.presentation_orgs],
	)
	const orgIds = useMemo(() => orgs.map((org) => org.id), [orgs])
	const available = Math.max(0, availableVotes ?? 0)
	const hasExistingResponse = Object.keys(responseDataFrom(responseData)).length > 0
	const [amounts, setAmounts] = useState(() => initialAmounts(orgIds, responseData, VOTES_FIELD_KEY))
	const [allowPartial, setAllowPartial] = useState(false)

	const remaining = remainingCents(available, amounts)
	const canSubmit = canFinalizeVote(available, amounts, allowPartial)
	const entries = allocationEntriesFromAmounts(amounts)
	const responseDataName = `presentation_interaction_response.response_data.${VOTES_FIELD_KEY}`

	const handleAmountChange = (orgId: string, nextVotes: number) => {
		setAmounts((current) => ({
			...current,
			[orgId]: clampOrgAmountCents(available, current, orgId, nextVotes),
		}))
	}

	if(votesField === undefined || availableVotes === null) {
		return null
	}

	return (
		<Form<FormPayload>
			action={ Routes.circlePresentationInteract(circleSlug, presentationSlug) }
			method="patch"
			className={ classes.root }
			initialData={ {
				presentation_interaction_response: {
					response_data: {
						[VOTES_FIELD_KEY]: entries,
					},
				},
			} }
			transform={ (data) => ({
				...data,
				presentation_interaction_response: {
					response_data: {
						[VOTES_FIELD_KEY]: allocationEntriesFromAmounts(amounts),
					},
				},
			}) }
		>
			<Stack className={ classes.rootStack } gap={ 0 }>
				<Box className={ classes.titleSection }>
					<Title order={ 2 } className={ classes.title }>{ activeInteraction.name }</Title>
				</Box>

				<SimpleGrid
					cols={ { base: 1, sm: 2 } }
					spacing="md"
					className={ classes.orgs }
				>
					{ orgs.map((org) => (
						<OrgVoteCard
							key={ org.id }
							orgName={ org.name }
							votes={ amounts[org.id] ?? 0 }
							maxVotes={ orgSliderMaxCents(available) }
							onChange={ (nextVotes) => {
								handleAmountChange(org.id, nextVotes)
							} }
						/>
					)) }
				</SimpleGrid>

				{ entries.map((entry, index) => (
					<Box key={ entry.org_id }>
						<HiddenInput
							name={ `${responseDataName}[${index}].org_id` }
							value={ entry.org_id }
						/>
						<HiddenInput
							name={ `${responseDataName}[${index}].amount_cents` }
							value={ entry.amount_cents }
						/>
					</Box>
				)) }

				<Stack className={ classes.actions } gap="sm">
					<Text className={ classes.fundsLeft }>
						{ t("presentations.interact.form.votes_left", { votes: Math.max(remaining, 0) }) }
					</Text>

					<Checkbox
						className={ classes.checkbox }
						wrapper={ false }
						label={ t("presentations.interact.form.partial_votes_submit") }
						checked={ allowPartial }
						onChange={ (event) => {
							setAllowPartial(event.currentTarget.checked)
						} }
					/>

					<Submit className={ classes.submit } disabled={ !canSubmit }>
						{ hasExistingResponse
							? t("presentations.interact.form.update")
							: t("presentations.interact.form.finalize") }
					</Submit>
				</Stack>
			</Stack>
		</Form>
	)
}
