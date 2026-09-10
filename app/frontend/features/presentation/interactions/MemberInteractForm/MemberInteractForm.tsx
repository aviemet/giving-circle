import { Render } from "@puckeditor/core"
import clsx from "clsx"
import { useMemo, type CSSProperties } from "react"
import { useTranslation } from "react-i18next"

import { Stack, Text, Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { memberPuckConfig } from "@/components/VisualEditor/config"
import {
	buildBackgroundImageStyle,
	hasBackgroundColor,
	normalizeBackgroundValue,
} from "@/components/VisualEditor/fields/backgroundImage"
import { responseDataFrom } from "@/domains/presentation/interactions/Form/ResponseFields"
import { PresentationDataProvider } from "@/features/presentation/PresentationDataProvider"
import { Routes } from "@/lib"
import { type Money } from "@/types"

import * as classes from "./MemberInteractForm.css"
import {
	MemberInteractionFormProvider,
	type ActiveInteractionProps,
} from "../form"
import { withMemberUiDefaults } from "../memberUi/withMemberUiDefaults"

export interface MemberInteractFormProps {
	circleSlug: string
	presentationSlug: string
	circle: Schema.CirclesPersisted
	theme?: Schema.ThemesPersisted
	presentation: Schema.PresentationsPresentation
	activeInteraction: ActiveInteractionProps
	responseData?: unknown
	availableFunds: Money | null
	availableVotes: number | null
}

type FormPayload = {
	presentation_interaction_response: {
		response_data: Record<string, unknown>
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function memberUiFromInteraction(activeInteraction: ActiveInteractionProps) {
	if(isRecord(activeInteraction.member_ui) && Object.keys(activeInteraction.member_ui).length > 0) {
		return activeInteraction.member_ui
	}

	return null
}

function hasMemberUiContent(memberUi: Record<string, unknown> | null): memberUi is Record<string, unknown> {
	if(memberUi === null) return false
	const content = memberUi.content
	return Array.isArray(content) && content.length > 0
}

function pageSurfaceStyle(memberUi: Record<string, unknown>): CSSProperties {
	const root = isRecord(memberUi.root) ? memberUi.root : {}
	const props = isRecord(root.props) ? root.props : {}
	const background = isRecord(props.background) ? props.background : undefined
	const resolvedBackground = normalizeBackgroundValue(
		background ?? { color: "#ffffff" },
	)
	const color = hasBackgroundColor(resolvedBackground.color)
		? resolvedBackground.color
		: "#ffffff"

	return {
		backgroundColor: color,
		...buildBackgroundImageStyle(resolvedBackground.image),
	}
}

function MemberInteractFormInner({
	circleSlug,
	presentationSlug,
	activeInteraction,
	responseData,
	availableFunds,
	availableVotes,
	memberUi,
}: MemberInteractFormProps & { memberUi: Record<string, unknown> }) {
	const { t } = useTranslation()
	const config = memberPuckConfig
	const hasExistingResponse = Object.keys(responseDataFrom(responseData)).length > 0
	const renderData = useMemo(() => withMemberUiDefaults(memberUi), [memberUi])
	const surfaceStyle = useMemo(() => pageSurfaceStyle(renderData), [renderData])

	return (
		<MemberInteractionFormProvider
			mode="runtime"
			activeInteraction={ activeInteraction }
			responseData={ responseData }
			availableFunds={ availableFunds }
			availableVotes={ availableVotes }
		>
			<Form<FormPayload>
				action={ Routes.circlePresentationInteract(circleSlug, presentationSlug) }
				method="patch"
				className={ clsx(classes.page) }
				style={ surfaceStyle }
			>
				<div className={ clsx(classes.canvas) }>
					<Render config={ config } data={ renderData } />
				</div>
				<div className={ clsx(classes.actions) }>
					<Submit>
						{ hasExistingResponse
							? t("presentations.interact.form.update")
							: t("presentations.interact.form.finalize") }
					</Submit>
				</div>
			</Form>
		</MemberInteractionFormProvider>
	)
}

export function MemberInteractForm(props: MemberInteractFormProps) {
	const { t } = useTranslation()
	const { circle, presentation, theme, activeInteraction } = props
	const memberUi = memberUiFromInteraction(activeInteraction)

	if(!hasMemberUiContent(memberUi)) {
		return (
			<div className={ clsx(classes.page) }>
				<Stack className={ clsx(classes.shell) } gap="md">
					<Title order={ 2 }>{ activeInteraction.name }</Title>
					<Text>{ t("presentations.interact.form.unsupported") }</Text>
				</Stack>
			</div>
		)
	}

	return (
		<PresentationDataProvider value={ { circle, presentation, theme } }>
			<MemberInteractFormInner { ...props } memberUi={ memberUi } />
		</PresentationDataProvider>
	)
}
