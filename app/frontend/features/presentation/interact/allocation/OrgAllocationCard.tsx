import { Slider } from "@mantine/core"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { CurrencyFormatter, Text } from "@/components"
import { InfoIcon, KeyboardIcon } from "@/components/Icons"
import { CurrencyInput } from "@/components/Inputs"
import { amountOf, fromCents } from "@/lib/money"
import { type Money } from "@/types"

import * as classes from "./OrgAllocationCard.css"

interface OrgAllocationCardProps {
	orgId: string
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
	const { t } = useTranslation()
	const [keyboardMode, setKeyboardMode] = useState(false)
	const amountMoney: Money = fromCents(amountCents, currencyIso)
	const maxDollars = amountOf(fromCents(maxCents, currencyIso))
	const amountDollars = amountOf(amountMoney)

	return (
		<article className={ classes.card }>
			<div className={ classes.header }>
				<button
					type="button"
					className={ classes.iconButton }
					aria-label={ keyboardMode
						? t("presentations.interact.form.toggle_slider")
						: t("presentations.interact.form.toggle_keyboard") }
					aria-pressed={ keyboardMode }
					onClick={ () => setKeyboardMode((current) => !current) }
				>
					<KeyboardIcon size={ 22 } />
				</button>
				<span className={ classes.iconButton } aria-hidden="true">
					<InfoIcon size={ 20 } />
				</span>
			</div>

			<div className={ classes.amount }>
				<CurrencyFormatter currency={ currencyIso }>
					{ amountMoney }
				</CurrencyFormatter>
			</div>

			{ keyboardMode
				? (
					<CurrencyInput
						className={ classes.currencyInput }
						wrapper={ false }
						aria-label={ orgName }
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
						className={ classes.slider }
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

			<Text className={ classes.orgName }>{ orgName }</Text>
		</article>
	)
}
