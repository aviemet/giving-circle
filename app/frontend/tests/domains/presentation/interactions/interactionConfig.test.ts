import { describe, expect, it } from "vitest"

import {
	applyInteractionConfigTemplate,
	clearInteractionConfigPipeline,
	configTemplateForUiTemplate,
	interactionConfigFrom,
	isCuratedInteractionUiSlug,
	isInteractionConfig,
} from "@/domains/presentation/interactions/Form/interactionConfig"
import { interactionFormContextFrom, responseDataFrom } from "@/domains/presentation/interactions/Form/ResponseFields"

describe("interaction config helpers", () => {
	it("recognizes valid interaction config", () => {
		const config = {
			fields: [{ key: "note", type: "text", label: "Note" }],
			outputs: [],
		}

		expect(isInteractionConfig(config)).toBe(true)
		expect(interactionConfigFrom(config).fields).toHaveLength(1)
	})

	it("returns blank config for invalid values", () => {
		expect(interactionConfigFrom(null)).toEqual({ fields: [], outputs: [], settings: {}, orchestration: {} })
	})

	it("applies template fields and outputs without replacing settings", () => {
		const current = {
			fields: [{ key: "note", type: "text" as const, label: "Note" }],
			outputs: [],
			settings: { default_votes: 7 },
			orchestration: {},
		}
		const templates = [{
			id: "template-1",
			name: "Finalist vote",
			config: {
				fields: [{ key: "votes", type: "org_money_map" as const, label: "Votes" }],
				outputs: [{ metric: "org_vote_totals", source_field: "votes", reducer: "sum_by_org" }],
				settings: { default_votes: 10 },
			},
		}]

		expect(applyInteractionConfigTemplate(current, "template-1", templates)).toEqual({
			fields: [{ key: "votes", type: "org_money_map", label: "Votes" }],
			outputs: [{ metric: "org_vote_totals", source_field: "votes", reducer: "sum_by_org" }],
			settings: { default_votes: 7 },
			orchestration: {},
		})
	})

	it("clears pipeline fields and outputs without replacing settings", () => {
		const current = {
			fields: [{ key: "note", type: "text" as const, label: "Note" }],
			outputs: [{ metric: "allocated_totals", source_field: "note", reducer: "count_by_value" }],
			settings: { allow_over_ask: true },
			orchestration: {},
		}

		expect(clearInteractionConfigPipeline(current)).toEqual({
			fields: [],
			outputs: [],
			settings: { allow_over_ask: true },
			orchestration: {},
		})
	})

	it("recognizes curated interaction ui slugs", () => {
		expect(isCuratedInteractionUiSlug("finalist_vote")).toBe(true)
		expect(isCuratedInteractionUiSlug("org_vote")).toBe(false)
	})

	it("finds a config template linked to a member screen", () => {
		const templates = [{
			id: "template-1",
			name: "Finalist vote",
			interaction_ui_template: { id: "ui-finalist" },
			config: {},
		}]

		expect(configTemplateForUiTemplate("ui-finalist", templates)?.id).toBe("template-1")
		expect(configTemplateForUiTemplate("ui-other", templates)).toBeUndefined()
	})

	it("normalizes form context from loose values", () => {
		expect(interactionFormContextFrom(null)).toEqual({})
		expect(interactionFormContextFrom({ choices: { color: ["red", "blue"] } })).toEqual({
			choices: { color: ["red", "blue"] },
		})
	})

	it("normalizes response data from loose values", () => {
		expect(responseDataFrom(null)).toEqual({})
		expect(responseDataFrom({ note: "hello" })).toEqual({ note: "hello" })
	})
})
