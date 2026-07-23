import React from "react"
import { useTranslation } from "react-i18next"

import { Select } from "@/components/Inputs"

import { type AdvancedInputProps } from "."

type DateRangeType = "exact" | "before" | "after" | "range"

function isDateRangeType(value: string): value is DateRangeType {
	return value === "exact" || value === "before" || value === "after" || value === "range"
}

const DateRangeType = ({
	advancedSearch,
	name,
}: AdvancedInputProps) => {
	const { t } = useTranslation()
	const { inputProps, setInputValue } = advancedSearch

	const dateRangeOptions = [
		{ label: t("common.table.exact_date"), value: "exact" },
		{ label: t("common.table.before"), value: "before" },
		{ label: t("common.table.after"), value: "after" },
		{ label: t("common.table.between"), value: "range" },
	]

	const handleChange = (value: string | null) => {
		if(value === null || !isDateRangeType(value)) {
			return
		}

		setInputValue(`${name}[type]`, value)
	}

	return (
		<Select
			label={ t("common.table.creation_date") }
			{ ...inputProps(`${name}[type]`) }
			onChange={ handleChange }
			options={ dateRangeOptions }
		/>
	)
}

export const Type = React.memo(DateRangeType)
