import { type PresentationValuesPayload } from "./usePresentationValuesChannel"

export const DEFAULT_FINALIST_COUNT = 5

interface EditorFinalistCountPresentation {
	settings?: {
		finalist_count?: number
	}
}

export function editorFinalistOrgIds(
	orgs: Array<{ id: string }>,
	finalistCount: number = DEFAULT_FINALIST_COUNT,
): string[] {
	const count = finalistCount >= 1 ? finalistCount : DEFAULT_FINALIST_COUNT
	return orgs.slice(0, count).map((org) => org.id)
}

export function buildEditorMockPresentationValues(
	orgs: Array<{ id: string }>,
	finalistCount: number = DEFAULT_FINALIST_COUNT,
): PresentationValuesPayload | undefined {
	if(orgs.length === 0) {
		return undefined
	}

	return {
		finalist_org_ids: editorFinalistOrgIds(orgs, finalistCount),
		allocated_totals: [],
		pledge_totals: [],
		funding_totals: [],
		funded_org_ids: [],
		leverage: null,
		org_vote_totals: [],
		money_totals: [],
		vote_counts: [],
		rank_totals: [],
	}
}

export function editorFinalistCountFromPresentation(
	presentation: EditorFinalistCountPresentation | undefined,
	circle?: Schema.CirclesMock | Schema.CirclesPersisted,
): number {
	const settings = presentation && "settings" in presentation ? presentation.settings : undefined
	if(settings && typeof settings.finalist_count === "number" && settings.finalist_count >= 1) {
		return settings.finalist_count
	}

	if(circle && "finalist_count" in circle && typeof circle.finalist_count === "number" && circle.finalist_count >= 1) {
		return circle.finalist_count
	}

	return DEFAULT_FINALIST_COUNT
}
