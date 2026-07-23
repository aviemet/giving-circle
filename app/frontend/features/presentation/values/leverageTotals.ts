import { useMemo } from "react"

import { centsOf, fromCents } from "@/lib/money"
import { type Money } from "@/types"

import { usePresentationDataContext } from "../PresentationDataProvider"

export interface LeverageTotals {
	remaining: Money
	total: Money
}

type ContextOrg =
	| Schema.OrgsPersisted
	| Schema.PresentationsOrgsPersisted

interface AllocatedTotalsSnapshot {
	allocated_totals: { allocated_cents: number }[]
}

const MOCK_REMAINING_CENTS = 6_000_000
const MOCK_TOTAL_CENTS = 40_000_000

function orgsFromContext(
	contextData: ReturnType<typeof usePresentationDataContext>,
): ContextOrg[] {
	const presentation = contextData?.presentation
	if(presentation && "orgs" in presentation && Array.isArray(presentation.orgs) && presentation.orgs.length > 0) {
		return presentation.orgs
	}

	if(contextData?.circle && "orgs" in contextData.circle && Array.isArray(contextData.circle.orgs)) {
		const circleOrgs = contextData.circle.orgs
		if(circleOrgs.length > 0) {
			return circleOrgs
		}
	}

	return []
}

function orgAskCents(org: ContextOrg) {
	if("ask" in org && org.ask !== null && org.ask !== undefined) {
		return org.ask.cents
	}

	return 0
}

function orgCurrencyIso(orgs: ContextOrg[]) {
	for(const org of orgs) {
		if("ask" in org && org.ask !== null && org.ask !== undefined) {
			return org.ask.currency_iso
		}
	}

	return "USD"
}

export function buildMockLeverage(currencyIso = "USD"): LeverageTotals {
	return {
		remaining: fromCents(MOCK_REMAINING_CENTS, currencyIso),
		total: fromCents(MOCK_TOTAL_CENTS, currencyIso),
	}
}

export function deriveLeverageFromAsksAndAllocated(
	askCentsList: number[],
	currencyIso: string,
	values: AllocatedTotalsSnapshot | undefined,
): LeverageTotals {
	const totalCents = askCentsList.reduce((sum, askCents) => sum + askCents, 0)
	const allocatedCents = (values?.allocated_totals ?? []).reduce(
		(sum, entry) => sum + entry.allocated_cents,
		0,
	)
	const remainingCents = Math.max(totalCents - allocatedCents, 0)

	return {
		remaining: fromCents(remainingCents, currencyIso),
		total: fromCents(totalCents > 0 ? totalCents : MOCK_TOTAL_CENTS, currencyIso),
	}
}

export function leverageFilledPercent(totals: LeverageTotals) {
	const totalCents = centsOf(totals.total)
	if(totalCents <= 0) {
		return 0
	}

	return Math.min((centsOf(totals.remaining) / totalCents) * 100, 100)
}

export function useLeverageTotals(): LeverageTotals {
	const contextData = usePresentationDataContext()
	const orgs = useMemo(() => orgsFromContext(contextData), [contextData])
	const presentationId = contextData?.presentation && "id" in contextData.presentation
		? contextData.presentation.id
		: undefined
	const isEditor = contextData?.isEditor === true
	const liveValues = contextData.values

	const currencyIso = useMemo(() => orgCurrencyIso(orgs), [orgs])
	const askCentsList = useMemo(() => orgs.map(orgAskCents), [orgs])

	return useMemo(() => {
		if(isEditor || !presentationId) {
			return buildMockLeverage(currencyIso)
		}

		return deriveLeverageFromAsksAndAllocated(askCentsList, currencyIso, liveValues)
	}, [askCentsList, currencyIso, isEditor, liveValues, presentationId])
}
