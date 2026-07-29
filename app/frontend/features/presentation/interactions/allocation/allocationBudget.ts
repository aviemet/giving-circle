import { type OrgMoneyMapEntry } from "@/domains/presentation/interactions/Form/ResponseFields"

export type AllocationAmounts = Record<string, number>

export function allocationAmountsFromEntries(
	orgIds: string[],
	entries: OrgMoneyMapEntry[] | undefined,
): AllocationAmounts {
	const amounts: AllocationAmounts = {}
	for(const orgId of orgIds) {
		amounts[orgId] = 0
	}

	if(!entries) return amounts

	for(const entry of entries) {
		if(orgIds.includes(entry.org_id)) {
			amounts[entry.org_id] = Math.max(0, entry.amount_cents)
		}
	}

	return amounts
}

export function allocationEntriesFromAmounts(amounts: AllocationAmounts): OrgMoneyMapEntry[] {
	return Object.entries(amounts).map(([orgId, amountCents]) => ({
		org_id: orgId,
		amount_cents: amountCents,
	}))
}

export function sumAllocatedCents(amounts: AllocationAmounts): number {
	return Object.values(amounts).reduce((total, amountCents) => total + amountCents, 0)
}

export function remainingCents(availableCents: number, amounts: AllocationAmounts): number {
	return availableCents - sumAllocatedCents(amounts)
}

export function orgSliderMaxCents(availableCents: number): number {
	return Math.max(0, availableCents)
}

export function maxAssignableCents(
	availableCents: number,
	amounts: AllocationAmounts,
	orgId: string,
): number {
	const current = amounts[orgId] ?? 0
	return Math.max(0, remainingCents(availableCents, amounts) + current)
}

export function canFinalizeVote(
	availableCents: number,
	amounts: AllocationAmounts,
	allowPartial: boolean,
): boolean {
	const remaining = remainingCents(availableCents, amounts)
	if(remaining < 0) return false
	if(allowPartial) return true
	return remaining === 0
}

export function clampOrgAmountCents(
	availableCents: number,
	amounts: AllocationAmounts,
	orgId: string,
	nextAmountCents: number,
): number {
	const maxCents = maxAssignableCents(availableCents, amounts, orgId)
	if(nextAmountCents < 0) return 0
	if(nextAmountCents > maxCents) return maxCents
	return Math.round(nextAmountCents)
}
