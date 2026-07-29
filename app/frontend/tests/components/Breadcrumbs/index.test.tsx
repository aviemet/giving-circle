import React from "react"
import { afterEach, describe, expect, test } from "vitest"

import { Breadcrumbs, breadcrumbLinks } from "@/components/Breadcrumbs"
import { render } from "@/tests/helpers/utils"

describe("components/Breadcrumbs", () => {
	afterEach(() => {
		document.getElementById("footer-portal")?.remove()
	})

	test("breadcrumbLinks maps href and plain titles", () => {
		const nodes = breadcrumbLinks([
			{ title: "Home", href: "/" },
			{ title: "Current" },
		])
		expect(nodes).toHaveLength(2)
	})

	test("renders crumbs into footer portal", () => {
		const portal = document.createElement("div")
		portal.id = "footer-portal"
		document.body.appendChild(portal)

		render(
			<Breadcrumbs
				crumbs={ [
					{ title: "Home", href: "/" },
					{ title: "Orgs" },
				] }
			/>,
		)

		expect(portal.querySelector('[aria-label="breadcrumbs"]')).toBeTruthy()
		expect(portal.textContent).toContain("Home")
		expect(portal.textContent).toContain("Orgs")
	})

	test("renders nothing without crumbs", () => {
		render(<Breadcrumbs />)
		expect(document.querySelector('[aria-label="breadcrumbs"]')).toBeNull()
	})
})
