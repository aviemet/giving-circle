import { createUsePuck } from "@puckeditor/core"
import { type ReactNode, useMemo } from "react"

import { getOrgsFromContext } from "@/components/VisualEditor/lib/dynamicData"
import {
	usePresentationDataContext,
	type PresentationDataContextValue,
} from "@/features/presentation/PresentationDataProvider"
import { createContext } from "@/lib/hooks/createContext"
import { type Money } from "@/types"

import {
	MemberInteractionFormProvider,
	type ActiveInteractionProps,
} from "../form"

const useMemberEditorPuck = createUsePuck()

const EDITOR_AVAILABLE_FUNDS: Money = {
	amount: 1_000,
	cents: 100_000,
	currency_iso: "USD",
}

export interface MemberInteractionEditorPreviewSource {
	id: string
	name: string
	slug: string
	config: unknown
	interaction_ui_template: {
		id: string
		slug: string
		name: string
	}
}

const [useMemberUiPreviewSource, MemberUiPreviewSourceProvider] = createContext<MemberInteractionEditorPreviewSource>()

export { useMemberUiPreviewSource, MemberUiPreviewSourceProvider }

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function rootPropsFromMemberUiData(data: unknown): Record<string, unknown> {
	if(!isRecord(data)) return {}

	const root = data.root
	if(!isRecord(root)) return {}

	const props = root.props
	return isRecord(props) ? props : {}
}

function numberFromRootProps(props: Record<string, unknown>, key: string, fallback: number): number {
	const value = props[key]
	if(typeof value === "number" && Number.isFinite(value)) {
		return value
	}

	return fallback
}

function booleanFromRootProps(props: Record<string, unknown>, key: string): boolean {
	return props[key] === true
}

export function buildMemberInteractionEditorPreviewInteraction(
	interaction: MemberInteractionEditorPreviewSource,
	presentationData: PresentationDataContextValue,
	rootProps: Record<string, unknown>,
): ActiveInteractionProps {
	const orgs = getOrgsFromContext(presentationData)
	const defaultVotes = numberFromRootProps(rootProps, "defaultVotes", 10)

	return {
		id: interaction.id,
		name: interaction.name,
		slug: interaction.slug,
		accepting_responses: true,
		config: interaction.config,
		interaction_ui_template: interaction.interaction_ui_template,
		context: {
			presentation_orgs: orgs,
			finalist_org_ids: presentationData.values?.finalist_org_ids,
			settings: {
				default_votes: defaultVotes,
				allow_non_finalists: booleanFromRootProps(rootProps, "allowNonFinalists"),
				allow_over_ask: booleanFromRootProps(rootProps, "allowOverAsk"),
			},
		},
	}
}

export function memberEditorAvailableVotes(rootProps: Record<string, unknown>): number {
	return numberFromRootProps(rootProps, "defaultVotes", 10)
}

interface MemberInteractionEditorPreviewProviderProps {
	interaction: MemberInteractionEditorPreviewSource
	children: ReactNode
}

export function MemberInteractionEditorPreviewProvider({
	interaction,
	children,
}: MemberInteractionEditorPreviewProviderProps) {
	const presentationData = usePresentationDataContext()
	const puckData = useMemberEditorPuck((state) => state.appState.data)
	const rootProps = useMemo(() => rootPropsFromMemberUiData(puckData), [puckData])
	const activeInteraction = useMemo(
		() => buildMemberInteractionEditorPreviewInteraction(interaction, presentationData, rootProps),
		[interaction, presentationData, rootProps],
	)
	const availableVotes = memberEditorAvailableVotes(rootProps)

	return (
		<MemberInteractionFormProvider
			mode="editor"
			activeInteraction={ activeInteraction }
			availableFunds={ EDITOR_AVAILABLE_FUNDS }
			availableVotes={ availableVotes }
		>
			{ children }
		</MemberInteractionFormProvider>
	)
}
