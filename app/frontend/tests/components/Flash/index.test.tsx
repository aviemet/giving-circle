import React from "react"
import { describe, expect, test } from "vitest"

import { Flash } from "@/components/Flash"
import { render } from "@/tests/helpers/utils"

describe("components/Flash", () => {
	test("mounts without throwing", () => {
		render(<Flash />)
		expect(document.body).toBeTruthy()
	})
})
