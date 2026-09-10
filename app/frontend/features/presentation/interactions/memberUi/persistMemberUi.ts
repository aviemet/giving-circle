import axios from "axios"

import { type PuckSlideData } from "@/components/VisualEditor/lib/EditorSave/editorPersistence"
import { isAllowedStatusCode } from "@/lib"

export type MemberUiParamRoot = "presentation_interaction" | "interaction_config_template"

export async function persistMemberUi(
	url: string,
	paramRoot: MemberUiParamRoot,
	data: PuckSlideData,
) {
	const response = await axios.patch(url, {
		[paramRoot]: {
			member_ui: data,
		},
	})

	if(!isAllowedStatusCode(response.statusText, [200, 201, 202])) {
		throw new Error("Save failed")
	}
}
