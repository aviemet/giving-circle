import clsx from "clsx"

import { Box } from "@/components"
import { i18n } from "@/lib/i18n"

import * as editorClasses from "./iterate.editor.css"

export function IterateHint() {
	return (
		<Box component="span" data-iterate-hint="" className={ clsx(editorClasses.hint) }>
			{ i18n.t("slides.editor.fields.iterate.hint") }
		</Box>
	)
}
