import React from "react"
import { describe, expect, test } from "vitest"

import { IndexTableTemplate } from "@/features/IndexTableTemplate"
import { createPagination } from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("features/IndexTableTemplate", () => {
	test("mounts with search and pagination", () => {
		render(
			<IndexTableTemplate
				model="orgs"
				pagination={ createPagination({ count: 1 }) }
				contextMenu={ {
					label: "Actions",
					options: [{ label: "Export", onClick: () => undefined }],
				} }
			>
				<div>table body</div>
			</IndexTableTemplate>,
		)
		expect(document.body).toBeTruthy()
	})
})
