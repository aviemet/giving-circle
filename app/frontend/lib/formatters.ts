import { type Money } from "@/types"

import { ensureDate } from "./dates"
import { dayjs } from "./dayjs"
import { intlLocale } from "./locale"
import { isMoney } from "./money"

const DEFAULT_CURRENCY = "USD"

type CurrencyFormatOptions = Omit<Intl.NumberFormatOptions, "style" | "currency">
type CurrencyInput = number | Money

function resolveCurrencyInput(value: CurrencyInput, currencyIso?: string): [number, string] {
	if(isMoney(value)) {
		return [value.amount, currencyIso ?? value.currency_iso]
	}

	return [value, currencyIso ?? DEFAULT_CURRENCY]
}

const formatCurrency = (
	value: CurrencyInput,
	currencyIso: string | undefined,
	options: CurrencyFormatOptions = {},
	locale = intlLocale(),
) => {
	const [amount, resolvedCurrency] = resolveCurrencyInput(value, currencyIso)

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: resolvedCurrency,
		...options,
	}).format(amount)
}

export const currency = {
	format: (value: CurrencyInput, currencyIso?: string, locale = intlLocale()) =>
		formatCurrency(value, currencyIso, {}, locale),
	whole: (value: CurrencyInput, currencyIso?: string, locale = intlLocale()) =>
		formatCurrency(value, currencyIso, { maximumFractionDigits: 0 }, locale),
	compact: (value: CurrencyInput, currencyIso?: string, locale = intlLocale()) =>
		formatCurrency(value, currencyIso, {
			notation: "compact",
			maximumFractionDigits: 0,
		}, locale),
}

export const number = {
	decimal: (value: number, fractionDigits = 1, locale = intlLocale()) =>
		new Intl.NumberFormat(locale, {
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits,
		}).format(value),
}

export const datetime = {
	// Date formatters
	dateShort: (date: string | Date) => dayjs(ensureDate(date)).format("M/DD/YY"),
	dateLong: (date: string | Date) => dayjs(ensureDate(date)).format("MM/DD/YYYY HH:mm:ss"),
	dateEnglish: (date: string | Date) => dayjs(ensureDate(date)).format("MM/DD/YYYY"),
	dateWithWeekday: (date: string | Date) => dayjs(ensureDate(date)).format("MMM D - dddd"),
	dateUrl: (date: string | Date) => dayjs(ensureDate(date)).format("YYYY-MM-DD"),

	// Time formatters
	timeShort: (date: string | Date) => {
		const d = dayjs(ensureDate(date))
		return d.format(`${d.get("minutes") > 0 ? "h:mm" : "h"}a`)
	},
	timeLong: (date: string | Date) => dayjs(ensureDate(date)).format("hh:mm A"),
	timeFull: (date: string | Date) => dayjs(ensureDate(date)).format("HH:mm:ss"),

	// DateTime formatters
	dateTimeShort: (date: string | Date) => {
		const d = dayjs(ensureDate(date))
		return d.format(`${d.get("minutes") > 0 ? "h:mm" : "h"}a MM/DD/YY`)
	},
	dateTimeLong: (date: string | Date) => dayjs(ensureDate(date)).format("hh:mm A MM/DD/YYYY"),
	dateTimeFull: (date: string | Date) => dayjs(ensureDate(date)).format("hh:mm A dddd MM/DD/YYYY"),

	// Relative time formatters
	fromNow: (date: string | Date, relativeTime?: string | Date) => {
		return relativeTime === undefined
			? dayjs(ensureDate(date)).fromNow()
			: dayjs(ensureDate(relativeTime)).from(ensureDate(date))
	},
	toNow: (date: string | Date, relativeTime?: string | Date) => {
		return relativeTime === undefined
			? dayjs(ensureDate(date)).toNow()
			: dayjs(ensureDate(relativeTime)).to(ensureDate(date))
	},
	duration: (date: string | Date, relativeTime?: string | Date) => {
		const start = relativeTime === undefined ? dayjs() : dayjs(ensureDate(relativeTime))
		return start.from(ensureDate(date), true)
	},
	range: (start: string | Date, end: string | Date) => {
		const startStr = dayjs(ensureDate(start)).format("MMMM D")
		const endStr = dayjs(ensureDate(end)).format("MMMM D")
		return `${startStr} - ${endStr}`
	},
}
