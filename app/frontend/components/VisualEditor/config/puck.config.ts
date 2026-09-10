import { basePuckConfig } from "./basePuck.config"
import { mergePuckConfig } from "./mergePuckConfig"
import { slidePuckOverrides, type SlideEditorConfig } from "../lib/slidePuckOverrides"

export type EditorConfig = SlideEditorConfig

export const config: EditorConfig = mergePuckConfig(basePuckConfig, slidePuckOverrides)
