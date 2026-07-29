import { describe, expect, test } from "vitest"

import { withLayout } from "@/lib/withLayout"

describe("lib/withLayout", () => {
	test("assigns defaultLayout on the page component", () => {
		function Page() {
			return null
		}

		const Wrapped = withLayout(Page, "app")
		expect(Wrapped.defaultLayout).toBe("app")
		expect(Wrapped).toBe(Page)
	})
})
