import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { DateRangeDate } from "@/components/Table/SearchInput/AdvancedSearch/Date"
import { useAdvancedSearch } from "@/components/Table/SearchInput/AdvancedSearch/useAdvancedSearch"
import { render } from "@/tests/helpers/utils"

describe("components/Table/SearchInput/AdvancedSearch/Date", () => {
	test("renders date input for advanced search", () => {
		function Harness() {
			const advancedSearch = useAdvancedSearch([
				{ name: "created", type: "date" },
			], { path: "/items" })

			return <DateRangeDate name="created" advancedSearch={ advancedSearch } />
		}

		render(<Harness />)
		screen.getByText("Date")
	})
})
