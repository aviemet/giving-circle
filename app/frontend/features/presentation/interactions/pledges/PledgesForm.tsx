import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Button, Group, SimpleGrid, Stack, Text, Title } from "@/components"
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
import { type MemberInteractionUiProps } from "../memberInteractionUi"

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
	activeInteraction,
}: Pick<MemberInteractionUiProps, "circleSlug" | "presentationSlug" | "activeInteraction">) {
	const { t } = useTranslation()
	const { values } = usePresentationDataContext()
	const formContext = interactionFormContextFrom(activeInteraction.context)
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
	const canSubmit = selectedOrgIds.length > 0 && amountCents > 0

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
			<Stack className={ classes.root } gap={ 0 }>
				<Stack className={ classes.thanks } gap="md">
					<Title order={ 2 }>{ t("presentations.interact.pledges.thanks_title") }</Title>
					<Text>{ t("presentations.interact.pledges.thanks_body") }</Text>
				</Stack>
			</Stack>
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
			<Stack className={ classes.titleSection } gap="sm">
				<Title order={ 2 } className={ classes.title }>
					{ t("presentations.interact.pledges.title") }
				</Title>
				<Text className={ classes.subtitle }>
					{ t("presentations.interact.pledges.subtitle") }
				</Text>
				<Group className={ classes.toolbar } justify="center" gap="md">
					<Checkbox
						wrapper={ false }
						label={ t("presentations.interact.pledges.anonymous") }
						checked={ anonymous }
						onChange={ (event) => {
							setAnonymous(event.currentTarget.checked)
						} }
					/>
					<Switch
						wrapper={ false }
						label={ t("presentations.interact.pledges.multi_org") }
						checked={ multiOrgSelect }
						onChange={ (event) => {
							handleMultiOrgSelectChange(event.currentTarget.checked)
						} }
					/>
					<Button
						type="button"
						className={ classes.clear }
						variant="filled"
						onClick={ clearForm }
					>
						{ t("presentations.interact.pledges.clear") }
					</Button>
				</Group>
			</Stack>

			<Stack className={ classes.section } gap="sm">
				<Title order={ 3 } className={ classes.sectionTitle }>
					{ t("presentations.interact.pledges.finalists") }
				</Title>
				<SimpleGrid cols={ 2 } spacing="sm" className={ classes.orgs }>
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
								onToggle={ () => {
									toggleOrg(org.id)
								} }
							/>
						)
					}) }
				</SimpleGrid>
			</Stack>

			{ runnerUpOrgs.length > 0 && (
				<Stack className={ classes.section } gap="sm">
					<Title order={ 3 } className={ classes.sectionTitle }>
						{ t("presentations.interact.pledges.runners_up") }
					</Title>
					<SimpleGrid cols={ 2 } spacing="sm" className={ classes.orgs }>
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
									onToggle={ () => {
										toggleOrg(org.id)
									} }
								/>
							)
						}) }
					</SimpleGrid>
				</Stack>
			) }

			<Stack className={ classes.actions } gap="sm">
				<CurrencyInput
					className={ classes.amountInput }
					wrapper={ false }
					placeholder={ t("presentations.interact.pledges.amount_placeholder") }
					value={ amountCents > 0 ? amountCents / 100 : undefined }
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
				{ activeInteraction.name
					? (
						<Text className={ classes.interactionName }>{ activeInteraction.name }</Text>
					)
					: null }
			</Stack>
		</Form>
	)
}

export function PledgesForm({
	circle,
	theme,
	presentation,
	circleSlug,
	presentationSlug,
	activeInteraction,
}: MemberInteractionUiProps) {
	return (
		<PresentationDataProvider
			value={ {
				circle,
				theme,
				presentation,
				isEditor: false,
			} }
		>
			<PledgesFormInner
				circleSlug={ circleSlug }
				presentationSlug={ presentationSlug }
				activeInteraction={ activeInteraction }
			/>
		</PresentationDataProvider>
	)
}
