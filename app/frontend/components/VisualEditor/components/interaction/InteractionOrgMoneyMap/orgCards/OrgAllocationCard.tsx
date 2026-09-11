import clsx from "clsx"
import { useState } from "react"

import { Box, CurrencyFormatter, Slider } from "@/components"
import { InfoIcon } from "@/components/Icons"
import { CurrencyInput } from "@/components/Inputs"
import { amountOf, fromCents } from "@/lib/money"
import { type Money } from "@/types"

import { OrgAmountCard } from "./OrgAmountCard"
import * as classes from "./OrgAmountCard.css"

interface OrgAllocationCardProps {
	orgName: string
	amountCents: number
	maxCents: number
	currencyIso: string
	onChange: (amountCents: number) => void
}

export function OrgAllocationCard({
	orgName,
	amountCents,
	maxCents,
	currencyIso,
	onChange,
}: OrgAllocationCardProps) {
	const [keyboardMode, setKeyboardMode] = useState(false)
	const amountMoney: Money = fromCents(amountCents, currencyIso)
	const maxDollars = amountOf(fromCents(maxCents, currencyIso))
	const amountDollars = amountOf(amountMoney)

	return (
		<OrgAmountCard
			orgName={ orgName }
			amount={ (
				<CurrencyFormatter currency={ currencyIso }>
					{ amountMoney }
				</CurrencyFormatter>
			) }
			keyboardMode={ keyboardMode }
			onToggleKeyboard={ () => setKeyboardMode((current) => !current) }
			headerEnd={ (
				<Box className={ clsx(classes.iconButton) } aria-hidden="true">
					<InfoIcon size={ 20 } />
				</Box>
			) }
		>
			{ keyboardMode
				? (
					<CurrencyInput
						className={ clsx(classes.numericInput) }
						wrapper={ false }
						aria-label={ orgName }
						currency={ currencyIso }
						value={ amountDollars }
						min={ 0 }
						max={ maxDollars }
						decimalScale={ 2 }
						fixedDecimalScale
						onChange={ (value) => {
							const nextDollars = typeof value === "number" ? value : Number(value)
							const safeDollars = Number.isFinite(nextDollars) ? nextDollars : 0
							onChange(Math.round(safeDollars * 100))
						} }
					/>
				)
				: (
					<Slider
						className={ clsx(classes.slider) }
						value={ amountDollars }
						min={ 0 }
						max={ Math.max(maxDollars, amountDollars) }
						step={ 1 }
						label={ null }
						onChange={ (value) => {
							onChange(Math.round(value * 100))
						} }
						aria-label={ orgName }
					/>
				) }
		</OrgAmountCard>
	)
}
