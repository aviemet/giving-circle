import { type ReactNode } from "react"

import {
	MemberInteractionEditorPreviewProvider,
	useMemberUiPreviewSource,
} from "@/features/presentation/interactions/memberUi"

export function VisualEditorMemberPreview({ children }: { children: ReactNode }) {
	const source = useMemberUiPreviewSource(false)
	if(source === null) {
		return children
	}

	return (
		<MemberInteractionEditorPreviewProvider interaction={ source }>
			{ children }
		</MemberInteractionEditorPreviewProvider>
	)
}
