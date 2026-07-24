import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { Checkbox } from "@/components/Inputs"
import { type InteractionFieldConfig } from "@/domains/presentation/interactions/Form/FieldBuilder"
import {
	interactionFormContextFrom,
	responseDataFrom,
	type OrgMoneyMapEntry,
} from "@/domains/presentation/interactions/Form/ResponseFields"
import { Routes } from "@/lib"
import { useCurrency } from "@/lib/hooks"
import { centsOf, fromCents } from "@/lib/money"
import { type Money } from "@/types"

import {
	allocationAmountsFromEntries,
	allocationEntriesFromAmounts,
	canFinalizeVote,
	clampOrgAmountCents,
	orgSliderMaxCents,
	remainingCents,
	type AllocationAmounts,
} from "./allocationBudget"
import * as classes from "./AllocationVoteForm.css"
import { OrgAllocationCard } from "./OrgAllocationCard"

interface AllocationVoteFormProps {
	circleSlug: string
	presentationSlug: string
	interactionName: string
	field: InteractionFieldConfig
	context: unknown
	responseData?: unknown
	availableFunds: Money
	hasExistingResponse?: boolean
}

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

export function AllocationVoteForm({
	circleSlug,
	presentationSlug,
	interactionName,
	field,
	context,
	responseData,
	availableFunds,
	hasExistingResponse = false,
}: AllocationVoteFormProps) {
	const { t } = useTranslation()
	const formContext = interactionFormContextFrom(context)
	const orgs = useMemo(
		() => formContext.presentation_orgs ?? [],
		[formContext.presentation_orgs],
	)
	const orgIds = useMemo(() => orgs.map((org) => org.id), [orgs])
	const availableCents = centsOf(availableFunds)
	const [amounts, setAmounts] = useState(() => initialAmounts(orgIds, responseData, field.key))
	const [allowPartial, setAllowPartial] = useState(false)

	const remaining = remainingCents(availableCents, amounts)
	const canSubmit = canFinalizeVote(availableCents, amounts, allowPartial)
	const remainingMoney = fromCents(Math.max(remaining, 0), availableFunds.currency_iso)
	const [remainingAmount, remainingFormatter] = useCurrency({
		amount: remainingMoney,
		currency: availableFunds.currency_iso,
	})
	const entries = allocationEntriesFromAmounts(amounts)

	const handleAmountChange = (orgId: string, nextAmountCents: number) => {
		setAmounts((current) => ({
			...current,
			[orgId]: clampOrgAmountCents(availableCents, current, orgId, nextAmountCents),
		}))
	}

	return (
		<Form<FormPayload>
			action={ Routes.circlePresentationInteract(circleSlug, presentationSlug) }
			method="patch"
			className={ classes.root }
			initialData={ {
				presentation_interaction_response: {
					response_data: {
						[field.key]: entries,
					},
				},
			} }
			transform={ (data) => ({
				...data,
				presentation_interaction_response: {
					response_data: {
						[field.key]: allocationEntriesFromAmounts(amounts),
					},
				},
			}) }
		>
			<header className={ classes.header }>
				<Title order={ 2 } className={ classes.title }>{ interactionName }</Title>
			</header>

			<div className={ classes.grid }>
				{ orgs.map((org) => (
					<OrgAllocationCard
						key={ org.id }
						orgId={ org.id }
						orgName={ org.name }
						amountCents={ amounts[org.id] ?? 0 }
						maxCents={ orgSliderMaxCents(availableCents) }
						currencyIso={ availableFunds.currency_iso }
						onChange={ (nextAmountCents) => {
							handleAmountChange(org.id, nextAmountCents)
						} }
					/>
				)) }
			</div>

			{ entries.map((entry, index) => (
				<span key={ entry.org_id }>
					<input
						type="hidden"
						name={ `presentation_interaction_response.response_data.${field.key}[${index}].org_id` }
						value={ entry.org_id }
						readOnly
					/>
					<input
						type="hidden"
						name={ `presentation_interaction_response.response_data.${field.key}[${index}].amount_cents` }
						value={ entry.amount_cents }
						readOnly
					/>
				</span>
			)) }

			<footer className={ classes.footer }>
				<p className={ classes.fundsLeft }>
					{ t("presentations.interact.form.funds_left", {
						amount: remainingFormatter.format(remainingAmount),
					}) }
				</p>

				<Checkbox
					className={ classes.checkbox }
					wrapper={ false }
					label={ t("presentations.interact.form.partial_submit") }
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
			</footer>
		</Form>
	)
}
