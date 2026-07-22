import { useCallback, useMemo, useState } from "react"

import { type PresentationValuesPayload } from "@/features/presentation"
import { usePresentationDataContext } from "@/layouts/Providers/PresentationDataProvider"
import { fromCents } from "@/lib/money"
import { type Money } from "@/types"

import { type AllocatedTotalEntry } from "./BarGraphAllocatedTotals"
import { usePresentationValuesChannel } from "./usePresentationValuesChannel"
import { getOrgsFromContext } from "../../dynamicData/getOrgsFromContext"

type ContextOrg = ReturnType<typeof getOrgsFromContext>[number]

function orgAsk(org: ContextOrg): Money | undefined {
	if("ask" in org && org.ask !== null && org.ask !== undefined) {
		return org.ask
	}

	return undefined
}

function randomNeedCents() {
	return 50_000 + Math.floor(Math.random() * 200_001)
}

function buildMockTotals(orgs: ContextOrg[]): AllocatedTotalEntry[] {
	return orgs.map((org, index) => {
		const ask = orgAsk(org)
		const currencyIso = ask?.currency_iso ?? "USD"
		const need = ask ?? fromCents(randomNeedCents(), currencyIso)
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
	values: PresentationValuesPayload | undefined,
): AllocatedTotalEntry[] {
	const totalsByOrgId = new Map(
		(values?.allocated_totals ?? []).map((total) => [total.org_id, total]),
	)

	return orgs.map((org) => {
		const total = totalsByOrgId.get(org.id)
		const ask = orgAsk(org)
		const currencyIso = total?.currency ?? ask?.currency_iso ?? "USD"
		const need = ask ?? fromCents(randomNeedCents(), currencyIso)
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
	const presentationId = contextData?.presentation?.id
	const isEditor = contextData?.isEditor === true

	const mockTotals = useMemo(() => buildMockTotals(orgs), [orgs])
	const [liveValues, setLiveValues] = useState<PresentationValuesPayload | undefined>(undefined)

	const handlePresentationValuesUpdated = useCallback((values: PresentationValuesPayload) => {
		setLiveValues(values)
	}, [])

	usePresentationValuesChannel({
		presentationId: presentationId ?? "",
		enabled: !isEditor && Boolean(presentationId),
		onPresentationValuesUpdated: handlePresentationValuesUpdated,
	})

	if(isEditor || !presentationId) {
		return mockTotals
	}

	if(liveValues) {
		return mergeTotalsWithOrgs(orgs, liveValues)
	}

	return mergeTotalsWithOrgs(orgs, undefined)
}
