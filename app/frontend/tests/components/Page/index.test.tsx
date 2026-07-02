import { screen } from "@testing-library/react"
import React from "react"
import { afterEach, beforeEach, describe, expect, test } from "vitest"

import { Page } from "@/components/Page"
import { useLayoutStore } from "@/store"
import { render } from "@/tests/helpers/utils"

describe("components/Page", () => {
	beforeEach(() => {
		useLayoutStore.setState({ siteTitle: "Giving Circle" })
	})

	afterEach(() => {
		useLayoutStore.setState({ siteTitle: "Giving Circle" })
	})

	test("sets browser title and shell header independently when both are provided", () => {
		render(
			<Page title="Tab title" heading="Shell heading">
				<p>Content</p>
			</Page>,
		)

		expect(screen.getByTestId("inertia-head")).toHaveAttribute("data-title", "Tab title")
		expect(useLayoutStore.getState().siteTitle).toBe("Shell heading")
	})

	test("uses title for shell header when heading is omitted", () => {
		render(
			<Page title="Only title">
				<p>Content</p>
			</Page>,
		)

		expect(useLayoutStore.getState().siteTitle).toBe("Only title")
	})

	test("uses heading only in shell when title is omitted", () => {
		render(
			<Page heading="Header only">
				<p>Content</p>
			</Page>,
		)

		expect(screen.queryByTestId("inertia-head")).toBeNull()
		expect(useLayoutStore.getState().siteTitle).toBe("Header only")
	})

	test("clears shell header when heading is null", () => {
		render(
			<Page title="Tab only" heading={ null }>
				<p>Content</p>
			</Page>,
		)

		expect(screen.getByTestId("inertia-head")).toHaveAttribute("data-title", "Tab only")
		expect(useLayoutStore.getState().siteTitle).toBeNull()
	})

	test("resets shell header to default on unmount", () => {
		const { unmount } = render(
			<Page title="Temporary">
				<p>Content</p>
			</Page>,
		)

		expect(useLayoutStore.getState().siteTitle).toBe("Temporary")

		unmount()

		expect(useLayoutStore.getState().siteTitle).toBe("Giving Circle")
	})
})
