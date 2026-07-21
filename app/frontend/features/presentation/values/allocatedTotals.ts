import { centsOf, currencyIsoOf, fromCents, type MoneyInput } from "@/lib/money"
import { type Money } from "@/types"

export interface AllocatedNeedAmounts {
	allocated: MoneyInput
	need: MoneyInput
}

export function isFullyFunded(entry: AllocatedNeedAmounts) {
	const needCents = centsOf(entry.need)
	return needCents > 0 && centsOf(entry.allocated) >= needCents
}

export function fundedPercent(entry: AllocatedNeedAmounts) {
	const needCents = centsOf(entry.need)
	if(needCents <= 0) return 0
	return Math.min((centsOf(entry.allocated) / needCents) * 100, 100)
}

export function remainingNeed(entry: AllocatedNeedAmounts): Money {
	const remainingCents = Math.max(centsOf(entry.need) - centsOf(entry.allocated), 0)
	return fromCents(remainingCents, currencyIsoOf(entry.need))
}
