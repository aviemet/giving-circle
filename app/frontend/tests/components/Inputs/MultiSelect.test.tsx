import { MantineProvider } from "@mantine/core"
import { render } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { MultiSelect } from "@/components/Inputs/MultiSelect"

describe("components/Inputs/MultiSelect", () => {
	test("forwards name to the Mantine hidden input", () => {
		render(
			<MantineProvider>
				<MultiSelect
					name="presentation.org_ids"
					label="Organizations"
					options={ [
						{ label: "Org One", value: "org-1" },
						{ label: "Org Two", value: "org-2" },
					] }
				/>
			</MantineProvider>,
		)

		const hidden = document.querySelector("input[type=\"hidden\"][name=\"presentation.org_ids\"]")
		expect(hidden).toBeTruthy()
	})
})
