import clsx from "clsx"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, SimpleGrid, Stack, Text } from "@/components"
import { Checkbox, CurrencyInput, HiddenInput } from "@/components/Inputs"
import { type OrgMoneyMapEntry } from "@/domains/presentation/interactions/Form/ResponseFields"
import { useOptionalMemberInteractionFormContext } from "@/features/presentation/interactions/form"
import { usePresentationDataContext } from "@/features/presentation/PresentationDataProvider"
import { isFullyFunded } from "@/features/presentation/values/allocatedTotals"
import { useCurrency } from "@/lib/hooks"
import { amountOf, centsOf, fromCents } from "@/lib/money"

import { type InteractionOrgMoneyMapComponentProps, type InteractionOrgMoneyMapProps } from "./InteractionOrgMoneyMap"
import * as classes from "./InteractionOrgMoneyMap.css"
import {
	allocationAmountsFromEntries,
	allocationEntriesFromAmounts,
	canFinalizeVote,
	clampOrgAmountCents,
	orgSliderMaxCents,
	remainingCents,
	type AllocationAmounts,
} from "./orgCards/allocationBudget"
import { OrgAllocationCard } from "./orgCards/OrgAllocationCard"
import { OrgVoteCard } from "./orgCards/OrgVoteCard"
import { PledgeOrgCard } from "./orgCards/PledgeOrgCard"

function editorPlaceholder(label: string) {
	return (
		<Box className={ clsx(classes.placeholder) }>
			<Text>{ label }</Text>
		</Box>
	)
}

function amountForOrg(entries: AllocationAmounts, orgId: string): number {
	return entries[orgId] ?? 0
}

function OrgMoneyMapHiddenInputs({
	fieldKey,
	entries,
}: {
	fieldKey: string
	entries: OrgMoneyMapEntry[]
}) {
	return (
		<>
			{ entries.map((entry, index) => (
				<Box key={ entry.org_id }>
					<HiddenInput
						name={ `presentation_interaction_response.response_data.${fieldKey}[${index}].org_id` }
						value={ entry.org_id }
					/>
					<HiddenInput
						name={ `presentation_interaction_response.response_data.${fieldKey}[${index}].amount_cents` }
						value={ entry.amount_cents }
					/>
				</Box>
			)) }
		</>
	)
}

function AllocationOrgMoneyMap({
	fieldKey,
	label,
}: Pick<InteractionOrgMoneyMapProps, "fieldKey" | "label">) {
	const { t } = useTranslation()
	const context = useOptionalMemberInteractionFormContext()
	const formContext = context?.formContext
	const orgs = useMemo(
		() => formContext?.presentation_orgs ?? [],
		[formContext?.presentation_orgs],
	)
	const orgIds = useMemo(() => orgs.map((org) => org.id), [orgs])
	const currencyIso = context?.availableFunds?.currency_iso ?? "USD"
	const availableCents = context?.availableFunds === null || context?.availableFunds === undefined
		? 0
		: centsOf(context.availableFunds)
	const entries = useMemo(
		() => context?.getOrgMoneyMapEntries(fieldKey) ?? [],
		[context, fieldKey],
	)
	const [allowPartial, setAllowPartial] = useState(false)
	const amounts = useMemo(
		() => allocationAmountsFromEntries(orgIds, entries),
		[entries, orgIds],
	)
	const remainingMoney = fromCents(
		Math.max(remainingCents(availableCents, amounts), 0),
		currencyIso,
	)
	const [remainingAmount, remainingFormatter] = useCurrency({
		amount: remainingMoney,
		currency: currencyIso,
	})

	if(context === null) return editorPlaceholder(label)

	const { setOrgMoneyMapAmount } = context

	return (
		<Stack className={ clsx(classes.root) } gap="md">
			<Text className={ clsx(classes.label) }>{ label }</Text>
			<SimpleGrid cols={ { base: 1, sm: 2, md: 3, lg: 4 } } spacing="md">
				{ orgs.map((org) => (
					<OrgAllocationCard
						key={ org.id }
						orgName={ org.name }
						amountCents={ amountForOrg(amounts, org.id) }
						maxCents={ orgSliderMaxCents(availableCents) }
						currencyIso={ currencyIso }
						onChange={ (nextAmountCents) => {
							setOrgMoneyMapAmount(fieldKey, org.id, nextAmountCents)
						} }
					/>
				)) }
			</SimpleGrid>
			<Text className={ clsx(classes.summary) }>
				{ t("presentations.interact.form.funds_left", { amount: remainingFormatter.format(remainingAmount) }) }
			</Text>
			<Checkbox
				label={ t("presentations.interact.form.partial_submit") }
				checked={ allowPartial }
				onChange={ (event) => {
					setAllowPartial(event.currentTarget.checked)
				} }
			/>
			<OrgMoneyMapHiddenInputs
				fieldKey={ fieldKey }
				entries={ allocationEntriesFromAmounts(amounts) }
			/>
			<HiddenInput
				name="__allocation_allow_partial"
				value={ allowPartial ? "1" : "0" }
			/>
		</Stack>
	)
}

function VoteOrgMoneyMap({
	fieldKey,
	label,
}: Pick<InteractionOrgMoneyMapProps, "fieldKey" | "label">) {
	const { t } = useTranslation()
	const context = useOptionalMemberInteractionFormContext()
	const formContext = context?.formContext
	const orgs = useMemo(
		() => formContext?.presentation_orgs ?? [],
		[formContext?.presentation_orgs],
	)
	const orgIds = useMemo(() => orgs.map((org) => org.id), [orgs])
	const available = Math.max(0, context?.availableVotes ?? 0)
	const entries = useMemo(
		() => context?.getOrgMoneyMapEntries(fieldKey) ?? [],
		[context, fieldKey],
	)
	const [allowPartial, setAllowPartial] = useState(false)
	const amounts = useMemo(
		() => allocationAmountsFromEntries(orgIds, entries),
		[entries, orgIds],
	)
	const remaining = remainingCents(available, amounts)

	if(context === null) return editorPlaceholder(label)

	const { setOrgMoneyMapAmount } = context

	return (
		<Stack className={ clsx(classes.root) } gap="md">
			<Text className={ clsx(classes.label) }>{ label }</Text>
			<SimpleGrid cols={ { base: 1, sm: 2, md: 3, lg: 4 } } spacing="md">
				{ orgs.map((org) => (
					<OrgVoteCard
						key={ org.id }
						orgName={ org.name }
						votes={ amountForOrg(amounts, org.id) }
						maxVotes={ orgSliderMaxCents(available) }
						onChange={ (nextVotes) => {
							const clamped = clampOrgAmountCents(available, amounts, org.id, nextVotes)
							setOrgMoneyMapAmount(fieldKey, org.id, clamped)
						} }
					/>
				)) }
			</SimpleGrid>
			<Text className={ clsx(classes.summary) }>
				{ t("presentations.interact.form.votes_left", { votes: Math.max(remaining, 0) }) }
			</Text>
			<Checkbox
				label={ t("presentations.interact.form.partial_votes_submit") }
				checked={ allowPartial }
				onChange={ (event) => {
					setAllowPartial(event.currentTarget.checked)
				} }
			/>
			<OrgMoneyMapHiddenInputs
				fieldKey={ fieldKey }
				entries={ allocationEntriesFromAmounts(amounts) }
			/>
		</Stack>
	)
}

function PledgeOrgMoneyMap({
	fieldKey,
	label,
}: Pick<InteractionOrgMoneyMapProps, "fieldKey" | "label">) {
	const { t } = useTranslation()
	const context = useOptionalMemberInteractionFormContext()
	const { values } = usePresentationDataContext()
	const formContext = context?.formContext
	const orgs = useMemo(
		() => formContext?.presentation_orgs ?? [],
		[formContext?.presentation_orgs],
	)
	const finalistIds = useMemo(
		() => new Set(formContext?.finalist_org_ids ?? orgs.map((org) => org.id)),
		[formContext?.finalist_org_ids, orgs],
	)
	const allowNonFinalists = formContext?.settings?.allow_non_finalists === true
	const entries = useMemo(
		() => context?.getOrgMoneyMapEntries(fieldKey) ?? [],
		[context, fieldKey],
	)
	const [selectedOrgIds, setSelectedOrgIds] = useState<string[]>(() => {
		return entries.map((entry) => entry.org_id)
	})
	const [amountCents, setAmountCents] = useState(() => entries[0]?.amount_cents ?? 0)
	const currencyIso = orgs[0]?.ask?.currency_iso ?? "USD"

	const fundingByOrg = useMemo(() => {
		const map = new Map<string, number>()
		for(const entry of values?.funding_totals ?? []) {
			map.set(entry.org_id, entry.funding_cents)
		}
		return map
	}, [values?.funding_totals])

	if(context === null) return editorPlaceholder(label)

	const toggleOrg = (orgId: string) => {
		setSelectedOrgIds((current) => {
			if(current.includes(orgId)) {
				return current.filter((id) => id !== orgId)
			}
			return [...current, orgId]
		})
	}

	const pledgeEntries = selectedOrgIds.map((orgId) => ({
		org_id: orgId,
		amount_cents: amountCents,
	}))
	const amountDollars = amountOf(fromCents(amountCents, currencyIso))

	return (
		<Stack className={ clsx(classes.root) } gap="md">
			<Text className={ clsx(classes.label) }>{ label }</Text>
			<SimpleGrid cols={ { base: 1, sm: 2, md: 3, lg: 4 } } spacing="md">
				{ orgs.map((org) => {
					const ask = org.ask
					const fundingCents = fundingByOrg.get(org.id) ?? 0
					const funded = ask
						? isFullyFunded({
							allocated: fromCents(fundingCents, ask.currency_iso),
							need: ask,
						})
						: false
					const isFinalist = finalistIds.has(org.id)
					const disabled = funded || (!isFinalist && !allowNonFinalists)
					return (
						<PledgeOrgCard
							key={ org.id }
							orgName={ org.name }
							selected={ selectedOrgIds.includes(org.id) }
							fullyFunded={ funded }
							disabled={ disabled }
							onToggle={ () => {
								if(disabled) return
								toggleOrg(org.id)
							} }
						/>
					)
				}) }
			</SimpleGrid>
			<CurrencyInput
				label={ t("presentations.interact.form.pledge_amount") }
				value={ amountDollars }
				min={ 0 }
				decimalScale={ 2 }
				fixedDecimalScale
				onChange={ (value) => {
					const nextDollars = typeof value === "number" ? value : Number(value)
					const safeDollars = Number.isFinite(nextDollars) ? nextDollars : 0
					setAmountCents(Math.round(safeDollars * 100))
				} }
			/>
			<OrgMoneyMapHiddenInputs
				fieldKey={ fieldKey }
				entries={ pledgeEntries }
			/>
		</Stack>
	)
}

export function InteractionOrgMoneyMapDisplay({
	fieldKey,
	label,
	outputMetric = "allocated_totals",
}: InteractionOrgMoneyMapComponentProps) {
	if(outputMetric === "org_vote_totals") {
		return <VoteOrgMoneyMap fieldKey={ fieldKey } label={ label } />
	}

	if(outputMetric === "pledge_totals") {
		return <PledgeOrgMoneyMap fieldKey={ fieldKey } label={ label } />
	}

	return <AllocationOrgMoneyMap fieldKey={ fieldKey } label={ label } />
}

export function interactionOrgMoneyMapCanSubmit(
	outputMetric: string,
	context: NonNullable<ReturnType<typeof useOptionalMemberInteractionFormContext>>,
): boolean {
	const orgIds = (context.formContext.presentation_orgs ?? []).map((org) => org.id)
	const entries = context.getOrgMoneyMapEntries("")

	if(outputMetric === "org_vote_totals") {
		const available = Math.max(0, context.availableVotes ?? 0)
		const amounts = allocationAmountsFromEntries(orgIds, entries)
		return canFinalizeVote(available, amounts, true)
	}

	if(outputMetric === "pledge_totals") {
		return entries.length > 0
	}

	const availableCents = context.availableFunds === null ? 0 : centsOf(context.availableFunds)
	const amounts = allocationAmountsFromEntries(orgIds, entries)
	return canFinalizeVote(availableCents, amounts, true)
}
