import { describe, expect, test } from "vitest"

import { normalizeFlexValue } from "@/components/VisualEditor/fields/flex"
import {
	alignMatrixCells,
	flexFromPhysicalAxes,
	physicalAxesFromFlex,
} from "@/components/VisualEditor/fields/shared/alignMatrixMapping"

describe("components/VisualEditor/fields/flex align mapping", () => {
	test("exposes nine matrix cells", () => {
		expect(alignMatrixCells()).toHaveLength(9)
	})

	test("maps row direction physical axes to justify and align", () => {
		expect(flexFromPhysicalAxes({
			flexDirection: "row",
			x: "center",
			y: "end",
		})).toEqual({
			justifyContent: "center",
			alignItems: "flex-end",
		})
	})

	test("maps column direction physical axes with swapped axes", () => {
		expect(flexFromPhysicalAxes({
			flexDirection: "column",
			x: "end",
			y: "center",
		})).toEqual({
			justifyContent: "center",
			alignItems: "flex-end",
		})
	})

	test("reads physical axes from flex values", () => {
		expect(physicalAxesFromFlex({
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "center",
		})).toEqual({ x: "start", y: "center" })

		expect(physicalAxesFromFlex({
			flexDirection: "column",
			justifyContent: "flex-end",
			alignItems: "stretch",
		})).toBeUndefined()
	})

	test("normalizeFlexValue fills defaults", () => {
		expect(normalizeFlexValue(undefined)).toMatchObject({
			display: "flex",
			flexDirection: "column",
			gap: 0,
		})
		expect(normalizeFlexValue({ display: "block" })).toMatchObject({
			display: "block",
			flexDirection: "column",
		})
	})
})
