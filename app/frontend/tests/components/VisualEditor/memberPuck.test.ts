import { describe, expect, test } from "vitest"

import {
	basePuckConfig,
	memberPuckConfig,
	mergePuckConfig,
	slidePuckConfig,
	slidePuckOverrides,
} from "@/components/VisualEditor/config"
import { memberPuckOverrides } from "@/features/presentation/interactions/memberUi"
import {
	createAllocationMemberUi,
	createPledgesMemberUi,
} from "@/tests/helpers/fixtures"

describe("mergePuckConfig", () => {
	test("merges slide and member overrides onto the base config", () => {
		const slideConfig = mergePuckConfig(basePuckConfig, slidePuckOverrides)
		const memberConfig = mergePuckConfig(basePuckConfig, memberPuckOverrides)

		expect(slideConfig.components?.BarGraphAllocatedTotals).toBeDefined()
		expect(memberConfig.components?.InteractionOrgMoneyMap).toBeDefined()
		expect(memberConfig.root?.fields?.stage).toBeDefined()
		expect(slidePuckConfig.components?.BarGraphAllocatedTotals).toBeDefined()
		expect(memberPuckConfig.components?.InteractionOrgMoneyMap).toBeDefined()
	})
})

describe("member ui fixtures", () => {
	test("include interaction input components", () => {
		const allocation = createAllocationMemberUi()
		const pledges = createPledgesMemberUi()
		const allocationContent = allocation.content
		const pledgesContent = pledges.content

		expect(Array.isArray(allocationContent) && allocationContent[0]?.type).toBe("InteractionOrgMoneyMap")
		expect(Array.isArray(pledgesContent) && pledgesContent[1]?.type).toBe("InteractionBooleanInput")
	})
})
