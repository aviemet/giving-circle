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

	const typeProps = inputProps(`${name}[type]`)
	const selectValue = typeof typeProps.value === "string" ? typeProps.value : ""

	return (
		<Select
			label={ t("common.table.creation_date") }
			name={ typeProps.name }
			value={ selectValue }
			mb={ typeProps.mb }
			wrapperProps={ typeProps.wrapperProps }
			onKeyUp={ typeProps.onKeyUp }
			onChange={ handleChange }
			options={ dateRangeOptions }
		/>
	)
}

export const Type = React.memo(DateRangeType)
