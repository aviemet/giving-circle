import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { Checkbox, CurrencyInput, Switch } from "@/components/Inputs"
import {
	interactionFormContextFrom,
	type OrgMoneyMapEntry,
} from "@/domains/presentation/interactions/Form/ResponseFields"
import {
	isFullyFunded,
	PresentationDataProvider,
	usePresentationDataContext,
} from "@/features/presentation"
import { Routes } from "@/lib"
import { fromCents } from "@/lib/money"

import { PledgeOrgCard } from "./PledgeOrgCard"
import * as classes from "./PledgesForm.css"

interface PledgesFormProps {
	circleSlug: string
	presentationSlug: string
	circle: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation: Schema.PresentationsPresentation
	interactionName: string
	context: unknown
	readOnly?: boolean
}

type FormPayload = {
	presentation_interaction_response: {
		response_data: {
			pledges: OrgMoneyMapEntry[]
			anonymous: boolean
		}
	}
}

function PledgesFormInner({
	circleSlug,
	presentationSlug,
	interactionName,
	context,
	readOnly = false,
}: Omit<PledgesFormProps, "circle" | "theme" | "presentation">) {
	const { t } = useTranslation()
	const { values } = usePresentationDataContext()
	const formContext = interactionFormContextFrom(context)
	const orgs = useMemo(
		() => formContext.presentation_orgs ?? [],
		[formContext.presentation_orgs],
	)
	const finalistIds = useMemo(
		() => new Set(formContext.finalist_org_ids ?? orgs.map((org) => org.id)),
		[formContext.finalist_org_ids, orgs],
	)
	const allowNonFinalists = formContext.settings?.allow_non_finalists === true
	const [selectedOrgIds, setSelectedOrgIds] = useState<string[]>([])
	const [amountCents, setAmountCents] = useState(0)
	const [anonymous, setAnonymous] = useState(false)
	const [multiOrgSelect, setMultiOrgSelect] = useState(false)
	const [showThanks, setShowThanks] = useState(false)

	useEffect(() => {
		if(!showThanks) return

		const timeoutId = window.setTimeout(() => {
			setShowThanks(false)
			setSelectedOrgIds([])
			setAmountCents(0)
			setAnonymous(false)
			setMultiOrgSelect(false)
		}, 2000)

		return () => {
			window.clearTimeout(timeoutId)
		}
	}, [showThanks])

	const allocatedByOrg = useMemo(() => {
		const map = new Map<string, number>()
		for(const entry of values?.allocated_totals ?? []) {
			map.set(entry.org_id, entry.allocated_cents)
		}
		return map
	}, [values?.allocated_totals])

	const finalistOrgs = orgs.filter((org) => finalistIds.has(org.id))
	const runnerUpOrgs = allowNonFinalists
		? orgs.filter((org) => !finalistIds.has(org.id))
		: []

	const entries: OrgMoneyMapEntry[] = selectedOrgIds.map((orgId) => ({
		org_id: orgId,
		amount_cents: amountCents,
	}))
	const canSubmit = selectedOrgIds.length > 0 && amountCents > 0 && !readOnly

	const toggleOrg = (orgId: string) => {
		setSelectedOrgIds((current) => {
			if(multiOrgSelect) {
				if(current.includes(orgId)) {
					return current.filter((id) => id !== orgId)
				}
				return [...current, orgId]
			}

			if(current.length === 1 && current[0] === orgId) {
				return []
			}

			return [orgId]
		})
	}

	const handleMultiOrgSelectChange = (checked: boolean) => {
		setMultiOrgSelect(checked)
		if(!checked) {
			setSelectedOrgIds((current) => current.slice(0, 1))
		}
	}

	const clearForm = () => {
		setSelectedOrgIds([])
		setAmountCents(0)
		setAnonymous(false)
		setMultiOrgSelect(false)
	}

	if(showThanks) {
		return (
			<div className={ classes.root }>
				<div className={ classes.thanks }>
					<Title order={ 2 }>{ t("presentations.interact.pledges.thanks_title") }</Title>
					<p>{ t("presentations.interact.pledges.thanks_body") }</p>
				</div>
			</div>
		)
	}

	return (
		<Form<FormPayload>
			action={ Routes.circlePresentationInteract(circleSlug, presentationSlug) }
			method="patch"
			className={ classes.root }
			initialData={ {
				presentation_interaction_response: {
					response_data: {
						pledges: entries,
						anonymous,
					},
				},
			} }
			transform={ (data) => ({
				...data,
				presentation_interaction_response: {
					response_data: {
						pledges: selectedOrgIds.map((orgId) => ({
							org_id: orgId,
							amount_cents: amountCents,
						})),
						anonymous,
					},
				},
			}) }
			onSuccess={ () => {
				setShowThanks(true)
			} }
		>
			<header className={ classes.header }>
				<Title order={ 2 } className={ classes.title }>
					{ t("presentations.interact.pledges.title") }
				</Title>
				<p className={ classes.subtitle }>
					{ t("presentations.interact.pledges.subtitle") }
				</p>
				<div className={ classes.toolbar }>
					<Checkbox
						wrapper={ false }
						label={ t("presentations.interact.pledges.anonymous") }
						checked={ anonymous }
						disabled={ readOnly }
						onChange={ (event) => {
							setAnonymous(event.currentTarget.checked)
						} }
					/>
					<Switch
						wrapper={ false }
						label={ t("presentations.interact.pledges.multi_org") }
						checked={ multiOrgSelect }
						disabled={ readOnly }
						onChange={ (event) => {
							handleMultiOrgSelectChange(event.currentTarget.checked)
						} }
					/>
					<button
						type="button"
						className={ classes.clear }
						disabled={ readOnly }
						onClick={ clearForm }
					>
						{ t("presentations.interact.pledges.clear") }
					</button>
				</div>
			</header>

			<section className={ classes.section }>
				<h3 className={ classes.sectionTitle }>
					{ t("presentations.interact.pledges.finalists") }
				</h3>
				<div className={ classes.grid }>
					{ finalistOrgs.map((org) => {
						const ask = org.ask
						const allocatedCents = allocatedByOrg.get(org.id) ?? 0
						const funded = ask
							? isFullyFunded({
								allocated: fromCents(allocatedCents, ask.currency_iso),
								need: ask,
							})
							: false

						return (
							<PledgeOrgCard
								key={ org.id }
								orgName={ org.name }
								selected={ selectedOrgIds.includes(org.id) }
								fullyFunded={ funded }
								disabled={ readOnly }
								onToggle={ () => {
									toggleOrg(org.id)
								} }
							/>
						)
					}) }
				</div>
			</section>

			{ runnerUpOrgs.length > 0 && (
				<section className={ classes.section }>
					<h3 className={ classes.sectionTitle }>
						{ t("presentations.interact.pledges.runners_up") }
					</h3>
					<div className={ classes.grid }>
						{ runnerUpOrgs.map((org) => {
							const ask = org.ask
							const allocatedCents = allocatedByOrg.get(org.id) ?? 0
							const funded = ask
								? isFullyFunded({
									allocated: fromCents(allocatedCents, ask.currency_iso),
									need: ask,
								})
								: false

							return (
								<PledgeOrgCard
									key={ org.id }
									orgName={ org.name }
									selected={ selectedOrgIds.includes(org.id) }
									fullyFunded={ funded }
									disabled={ readOnly }
									onToggle={ () => {
										toggleOrg(org.id)
									} }
								/>
							)
						}) }
					</div>
				</section>
			) }

			<footer className={ classes.footer }>
				<CurrencyInput
					className={ classes.amountInput }
					wrapper={ false }
					placeholder={ t("presentations.interact.pledges.amount_placeholder") }
					value={ amountCents > 0 ? amountCents / 100 : undefined }
					disabled={ readOnly }
					decimalScale={ 2 }
					fixedDecimalScale
					onChange={ (value) => {
						const next = typeof value === "number" ? value : Number(value)
						if(!Number.isFinite(next)) {
							setAmountCents(0)
							return
						}
						setAmountCents(Math.round(next * 100))
					} }
				/>
				<Submit className={ classes.submit } disabled={ !canSubmit }>
					{ t("presentations.interact.pledges.submit") }
				</Submit>
				{ interactionName
					? (
						<p className={ classes.interactionName }>{ interactionName }</p>
					)
					: null }
			</footer>
		</Form>
	)
}

export function PledgesForm({
	circle,
	theme,
	presentation,
	...props
}: PledgesFormProps) {
	return (
		<PresentationDataProvider
			value={ {
				circle,
				theme,
				presentation,
				isEditor: false,
			} }
		>
			<PledgesFormInner { ...props } />
		</PresentationDataProvider>
	)
}
