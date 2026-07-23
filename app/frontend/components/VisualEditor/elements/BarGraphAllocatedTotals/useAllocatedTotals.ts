import { useMemo } from "react"

import { usePresentationDataContext } from "@/features/presentation"
import { fromCents } from "@/lib/money"
import { type Money } from "@/types"

import { type AllocatedTotalEntry } from "./BarGraphAllocatedTotals"
import { getOrgsFromContext } from "../../dynamicData/getOrgsFromContext"

type ContextOrg = ReturnType<typeof getOrgsFromContext>[number]
type PresentationValues = NonNullable<ReturnType<typeof usePresentationDataContext>>["values"]

function orgAsk(org: ContextOrg): Money | undefined {
	if("ask" in org && org.ask !== null && org.ask !== undefined) {
		return org.ask
	}

	return undefined
}

export function stableMockNeedCents(orgId: string) {
	let hash = 2166136261

	for(let index = 0; index < orgId.length; index++) {
		hash ^= orgId.charCodeAt(index)
		hash = Math.imul(hash, 16777619)
	}

	return 50_000 + (hash >>> 0) % 200_001
}

function buildMockTotals(orgs: ContextOrg[]): AllocatedTotalEntry[] {
	return orgs.map((org, index) => {
		const ask = orgAsk(org)
		const currencyIso = ask?.currency_iso ?? "USD"
		const need = ask ?? fromCents(stableMockNeedCents(org.id), currencyIso)
		const allocated = fromCents((index + 1) * 25_000, currencyIso)

		return {
			orgId: org.id,
			orgName: org.name,
			allocated,
			need,
		}
	})
}

function mergeTotalsWithOrgs(
	orgs: ContextOrg[],
	values: PresentationValues,
): AllocatedTotalEntry[] {
	const totalsByOrgId = new Map(
		(values?.allocated_totals ?? []).map((total) => [total.org_id, total]),
	)

	return orgs.map((org) => {
		const total = totalsByOrgId.get(org.id)
		const ask = orgAsk(org)
		const currencyIso = total?.currency ?? ask?.currency_iso ?? "USD"
		const need = ask ?? fromCents(stableMockNeedCents(org.id), currencyIso)
		const allocated = fromCents(total?.allocated_cents ?? 0, currencyIso)

		return {
			orgId: org.id,
			orgName: org.name,
			allocated,
			need,
		}
	})
}

export function useAllocatedTotals(): AllocatedTotalEntry[] {
	const contextData = usePresentationDataContext()
	const orgs = useMemo(() => getOrgsFromContext(contextData), [contextData])
	const presentationId = contextData.presentation && "id" in contextData.presentation
		? contextData.presentation.id
		: undefined
	const isEditor = contextData.isEditor === true
	const liveValues = contextData.values

	const mockTotals = useMemo(() => buildMockTotals(orgs), [orgs])

	if(isEditor || !presentationId) {
		return mockTotals
	}

	return mergeTotalsWithOrgs(orgs, liveValues)
}
