import { renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { useCheckboxState } from "@/lib/hooks/useCheckboxState"

describe("lib/hooks/useCheckboxState", () => {
	test("returns empty all and none selected states", () => {
		expect(renderHook(() => useCheckboxState(0, 0)).result.current).toEqual({
			allChecked: false,
			indeterminate: false,
		})
		expect(renderHook(() => useCheckboxState(3, 0)).result.current).toEqual({
			allChecked: false,
			indeterminate: false,
		})
		expect(renderHook(() => useCheckboxState(3, 3)).result.current).toEqual({
			allChecked: true,
			indeterminate: false,
		})
		expect(renderHook(() => useCheckboxState(3, 1)).result.current).toEqual({
			allChecked: false,
			indeterminate: true,
		})
	})
})
