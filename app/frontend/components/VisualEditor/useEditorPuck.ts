import { createUsePuck } from "@puckeditor/core"

import { type EditorConfig } from "./puck.config"

export const useEditorPuck = createUsePuck<EditorConfig>()
