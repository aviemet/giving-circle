import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { DangerousHtml } from "@/components/DangerousHtml"
import { render } from "@/tests/helpers/utils"

describe("components/DangerousHtml", () => {
	test("renders sanitized html", () => {
		render(<DangerousHtml>{ "<strong>Safe</strong><script>alert(1)</script>" }</DangerousHtml>)
		expect(screen.getByText("Safe").tagName).toBe("STRONG")
		expect(document.querySelector("script")).toBeNull()
	})

	test("renders empty when children omitted", () => {
		const { container } = render(<DangerousHtml />)
		expect(container.querySelector("div")?.innerHTML).toBe("")
	})
})
