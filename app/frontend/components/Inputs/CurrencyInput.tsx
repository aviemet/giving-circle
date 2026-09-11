import React from "react"

import { useCurrency } from "@/lib/hooks"

import { NumberInput, type NumberInputProps } from "./NumberInput"

import { type BaseInputProps } from "."

export interface CurrencyInputProps extends NumberInputProps, BaseInputProps {
	ref?: React.Ref<HTMLInputElement>
	currency?: string
	symbol?: string | React.ReactNode
}

export function CurrencyInput({
	currency,
	symbol,
	...props
}: CurrencyInputProps) {
	const [, formatter] = useCurrency({ amount: 0, currency })
	const currencyPart = formatter.formatToParts(0).find((part) => part.type === "currency")

	return (
		<NumberInput
			leftSection={ symbol ?? currencyPart?.value }
			hideControls
			{ ...props }
		/>
	)
}
