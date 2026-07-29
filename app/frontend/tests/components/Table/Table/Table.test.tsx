import { screen } from "@testing-library/react"
import React from "react"
import { describe, test } from "vitest"

import { Table } from "@/components/Table/Table/Table"
import { render } from "@/tests/helpers/utils"

describe("components/Table/Table", () => {
	test("renders table wrapper", () => {
		render(
			<Table>
				<tbody>
					<tr>
						<td>Cell</td>
					</tr>
				</tbody>
			</Table>,
		)

		screen.getByText("Cell")
	})
})
