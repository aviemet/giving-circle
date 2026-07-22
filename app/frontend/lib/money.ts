import { type Money } from "@/types"

const DEFAULT_CURRENCY = "USD"

export type MoneyInput = number | Money

export function isMoney(value: number | Money | null | undefined): value is Money {
	return typeof value === "object"
		&& value !== null
		&& typeof value.cents === "number"
		&& typeof value.amount === "number"
		&& typeof value.currency_iso === "string"
}

export function fromCents(cents: number, currencyIso = DEFAULT_CURRENCY): Money {
	return {
		cents,
		amount: cents / 100,
		currency_iso: currencyIso,
	}
}

export function centsOf(value: MoneyInput): number {
	if(typeof value === "number") {
		return value
	}

	return value.cents
}

export function amountOf(value: MoneyInput): number {
	if(typeof value === "number") {
		return value / 100
	}

	return value.amount
}

export function currencyIsoOf(value: MoneyInput, fallback = DEFAULT_CURRENCY): string {
	if(typeof value === "number") {
		return fallback
	}

	return value.currency_iso
}
