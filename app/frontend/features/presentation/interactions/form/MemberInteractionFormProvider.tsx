import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import {
	interactionFormContextFrom,
	responseDataFrom,
	type OrgMoneyMapEntry,
} from "@/domains/presentation/interactions/Form/ResponseFields"
import { type Money } from "@/types"

export interface ActiveInteractionProps {
	id: string
	name: string
	slug: string
	accepting_responses: boolean
	config: unknown
	member_ui?: unknown
	context?: unknown
	interaction_ui_template: {
		id: string
		slug: string
		name: string
	}
}

export type MemberInteractionFormMode = "editor" | "runtime"

export interface MemberInteractionFormProviderProps {
	mode: MemberInteractionFormMode
	activeInteraction: ActiveInteractionProps
	responseData?: unknown
	availableFunds: Money | null
	availableVotes: number | null
	children: ReactNode
}

interface MemberInteractionFormContextValue {
	mode: MemberInteractionFormMode
	activeInteraction: ActiveInteractionProps
	formContext: ReturnType<typeof interactionFormContextFrom>
	availableFunds: Money | null
	availableVotes: number | null
	getFieldValue: (fieldKey: string) => unknown
	setFieldValue: (fieldKey: string, value: unknown) => void
	getOrgMoneyMapEntries: (fieldKey: string) => OrgMoneyMapEntry[]
	setOrgMoneyMapAmount: (fieldKey: string, orgId: string, amountCents: number) => void
	getBooleanValue: (fieldKey: string) => boolean
	setBooleanValue: (fieldKey: string, value: boolean) => void
	getOrgReferenceValue: (fieldKey: string) => string | null
	setOrgReferenceValue: (fieldKey: string, orgId: string | null) => void
}

const MemberInteractionFormContext = createContext<MemberInteractionFormContextValue | null>(null)

function isOrgMoneyMapEntry(value: unknown): value is OrgMoneyMapEntry {
	return typeof value === "object"
		&& value !== null
		&& !Array.isArray(value)
		&& "org_id" in value
		&& "amount_cents" in value
		&& typeof value.org_id === "string"
		&& typeof value.amount_cents === "number"
}

function orgMoneyMapFromValue(value: unknown): OrgMoneyMapEntry[] {
	if(!Array.isArray(value)) return []

	return value.filter(isOrgMoneyMapEntry)
}

export function MemberInteractionFormProvider({
	mode,
	activeInteraction,
	responseData,
	availableFunds,
	availableVotes,
	children,
}: MemberInteractionFormProviderProps) {
	const formContext = useMemo(
		() => interactionFormContextFrom(activeInteraction.context),
		[activeInteraction.context],
	)
	const [fieldValues, setFieldValues] = useState<Record<string, unknown>>(() => {
		return responseDataFrom(responseData)
	})

	const getFieldValue = useCallback((fieldKey: string) => {
		return fieldValues[fieldKey]
	}, [fieldValues])

	const setFieldValue = useCallback((fieldKey: string, value: unknown) => {
		setFieldValues((current) => ({
			...current,
			[fieldKey]: value,
		}))
	}, [])

	const getOrgMoneyMapEntries = useCallback((fieldKey: string) => {
		return orgMoneyMapFromValue(fieldValues[fieldKey])
	}, [fieldValues])

	const setOrgMoneyMapAmount = useCallback((fieldKey: string, orgId: string, amountCents: number) => {
		setFieldValues((current) => {
			const entries = orgMoneyMapFromValue(current[fieldKey])
			const nextEntries = [...entries]
			const existingIndex = nextEntries.findIndex((entry) => entry.org_id === orgId)
			const nextEntry = { org_id: orgId, amount_cents: Math.max(0, amountCents) }

			if(existingIndex === -1) {
				nextEntries.push(nextEntry)
			} else {
				nextEntries[existingIndex] = nextEntry
			}

			return {
				...current,
				[fieldKey]: nextEntries.filter((entry) => entry.amount_cents > 0),
			}
		})
	}, [])

	const getBooleanValue = useCallback((fieldKey: string) => {
		return fieldValues[fieldKey] === true
	}, [fieldValues])

	const setBooleanValue = useCallback((fieldKey: string, value: boolean) => {
		setFieldValue(fieldKey, value)
	}, [setFieldValue])

	const getOrgReferenceValue = useCallback((fieldKey: string) => {
		const value = fieldValues[fieldKey]
		return typeof value === "string" ? value : null
	}, [fieldValues])

	const setOrgReferenceValue = useCallback((fieldKey: string, orgId: string | null) => {
		setFieldValue(fieldKey, orgId)
	}, [setFieldValue])

	const value = useMemo((): MemberInteractionFormContextValue => ({
		mode,
		activeInteraction,
		formContext,
		availableFunds,
		availableVotes,
		getFieldValue,
		setFieldValue,
		getOrgMoneyMapEntries,
		setOrgMoneyMapAmount,
		getBooleanValue,
		setBooleanValue,
		getOrgReferenceValue,
		setOrgReferenceValue,
	}), [
		mode,
		activeInteraction,
		formContext,
		availableFunds,
		availableVotes,
		getFieldValue,
		setFieldValue,
		getOrgMoneyMapEntries,
		setOrgMoneyMapAmount,
		getBooleanValue,
		setBooleanValue,
		getOrgReferenceValue,
		setOrgReferenceValue,
	])

	return (
		<MemberInteractionFormContext.Provider value={ value }>
			{ children }
		</MemberInteractionFormContext.Provider>
	)
}

export function useMemberInteractionFormContext() {
	const context = useContext(MemberInteractionFormContext)
	if(context === null) {
		throw new Error("useMemberInteractionFormContext must be used within MemberInteractionFormProvider")
	}

	return context
}

export function useOptionalMemberInteractionFormContext() {
	return useContext(MemberInteractionFormContext)
}

export function memberInteractionResponseData(
	getFieldValue: MemberInteractionFormContextValue["getFieldValue"],
	fieldKeys: string[],
): Record<string, unknown> {
	const responseData: Record<string, unknown> = {}
	for(const fieldKey of fieldKeys) {
		const value = getFieldValue(fieldKey)
		if(value !== undefined) {
			responseData[fieldKey] = value
		}
	}
	return responseData
}
