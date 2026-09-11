import clsx from "clsx"

import { Box } from "@/components"
import { i18n } from "@/lib/i18n"

import {
	isFinalistOrgIterate,
	type IterateValue,
} from "./iterate"
import * as editorClasses from "./iterate.editor.css"

function iterateHintKey(iterate: IterateValue | undefined): string {
	if(isFinalistOrgIterate(iterate)) {
		return "hint_finalist_organizations"
	}

	return "hint"
}

export function IterateHint({ iterate }: { iterate: IterateValue | undefined }) {
	return (
		<Box component="span" data-iterate-hint="" className={ clsx(editorClasses.hint) }>
			{ i18n.t(`slides.editor.fields.iterate.${iterateHintKey(iterate)}`) }
		</Box>
	)
}
