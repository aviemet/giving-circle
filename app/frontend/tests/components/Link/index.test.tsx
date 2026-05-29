import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { Link } from "@/components/Link"
import { render } from "@/tests/helpers/utils"

describe("Link", () => {
	test("opens internal links in a new tab with target blank", () => {
		render(
			<Link href="/circle-1/p/presentation-1" target="_blank" rel="noreferrer">
				Presentation
			</Link>,
		)

		const link = screen.getByRole("link", { name: "Presentation" })
		expect(link).toHaveAttribute("href", "/circle-1/p/presentation-1")
		expect(link).toHaveAttribute("target", "_blank")
		expect(link).toHaveAttribute("rel", "noreferrer")
	})
})
