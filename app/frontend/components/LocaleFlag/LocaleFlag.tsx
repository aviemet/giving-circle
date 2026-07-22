import clsx from "clsx"
import { hasFlag } from "country-flag-icons"
import * as FlagComponents from "country-flag-icons/react/3x2"
import { createElement, type FunctionComponent } from "react"

import * as classes from "./LocaleFlag.css"

interface LocaleFlagProps {
	region: string
	title?: string
	className?: string
	decorative?: boolean
}

interface FlagProps {
	title?: string
	className?: string
	"aria-hidden"?: boolean
}

function isFlagComponent(value: unknown): value is FunctionComponent<FlagProps> {
	return typeof value === "function"
}

export function LocaleFlag({ region, title, className, decorative = false }: LocaleFlagProps) {
	if(!hasFlag(region)) return null

	const candidate = Reflect.get(FlagComponents, region)
	if(!isFlagComponent(candidate)) return null

	return createElement(candidate, {
		title: decorative ? undefined : (title ?? region),
		"aria-hidden": decorative ? true : undefined,
		className: clsx(classes.flag, className),
	})
}
