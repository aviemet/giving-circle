import { describe, expect, test } from "vitest"

import { memberUiPuckData, withMemberUiDefaults } from "@/features/presentation/interactions/memberUi"

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function rootPropsFrom(result: Record<string, unknown>): Record<string, unknown> {
	const root = result.root
	if(!isRecord(root)) {
		throw new Error("expected root object")
	}

	const props = root.props
	if(!isRecord(props)) {
		throw new Error("expected root.props object")
	}

	return props
}

describe("withMemberUiDefaults", () => {
	test("fills white background when root props omit surface fields", () => {
		const result = withMemberUiDefaults({
			content: [{ type: "InteractionOrgMoneyMap", props: { id: "a" } }],
			root: {
				props: {
					title: "Pledges",
				},
			},
		})

		const rootProps = rootPropsFrom(result)

		expect(rootProps.title).toBe("Pledges")
		expect(rootProps.background).toEqual({
			color: "#ffffff",
			image: {
				url: "",
				size: "cover",
				customSize: "100% 100%",
				offsetX: "center",
				offsetY: "center",
				repeat: "no-repeat",
				attachment: "scroll",
			},
		})
	})

	test("keeps an authored background color", () => {
		const result = withMemberUiDefaults({
			root: {
				props: {
					title: "Pledges",
					background: {
						color: "#111111",
						image: {
							url: "",
							size: "cover",
							customSize: "100% 100%",
							offsetX: "center",
							offsetY: "center",
							repeat: "no-repeat",
							attachment: "scroll",
						},
					},
				},
			},
		})

		const rootProps = rootPropsFrom(result)
		const background = rootProps.background
		if(!isRecord(background)) {
			throw new Error("expected background object")
		}

		expect(background.color).toBe("#111111")
	})

	test("memberUiPuckData hydrates missing or non-object member_ui", () => {
		const fromEmpty = memberUiPuckData(undefined)
		const rootProps = rootPropsFrom(fromEmpty)
		const background = rootProps.background
		if(!isRecord(background)) {
			throw new Error("expected background object")
		}

		expect(background.color).toBe("#ffffff")
	})
})
