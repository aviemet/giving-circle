import React from "react"
import { useTranslation } from "react-i18next"

import { NumberInput, type NumberInputProps } from "./NumberInput"

import { type BaseInputProps } from "."

export interface CurrencyInputProps extends NumberInputProps, BaseInputProps {
	ref?: React.Ref<HTMLInputElement>
	symbol?: string | React.ReactNode
}

export function CurrencyInput({
	symbol,
	...props
}: CurrencyInputProps) {
	const { t } = useTranslation()

	return (
		<NumberInput
			leftSection={ symbol ?? t("number.currency.format.unit") }
			hideControls
			{ ...props }
		/>
	)
}
