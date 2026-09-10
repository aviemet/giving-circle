import { memberPuckOverrides } from "@/features/presentation/interactions/memberUi/memberPuckOverrides"

import { basePuckConfig } from "./basePuck.config"
import { mergePuckConfig } from "./mergePuckConfig"

export const memberPuckConfig = mergePuckConfig(basePuckConfig, memberPuckOverrides)
