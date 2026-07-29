import { screen } from "@testing-library/react"
import React from "react"
import { describe, expect, test } from "vitest"

import { ConditionalWrapper } from "@/components/ConditionalWrapper"
import { render } from "@/tests/helpers/utils"

describe("components/ConditionalWrapper", () => {
	test("wraps when condition is true", () => {
		render(
			<ConditionalWrapper
				condition={ true }
				wrapper={ (children) => <div data-testid="wrapped">{ children }</div> }
			>
				<span>inside</span>
			</ConditionalWrapper>,
		)
		expect(screen.getByTestId("wrapped")).toHaveTextContent("inside")
	})

	test("uses elseWrapper when condition is false", () => {
		render(
			<ConditionalWrapper
				condition={ false }
				wrapper={ (children) => <div data-testid="wrapped">{ children }</div> }
				elseWrapper={ (children) => <div data-testid="else">{ children }</div> }
			>
				<span>inside</span>
			</ConditionalWrapper>,
		)
		expect(screen.getByTestId("else")).toHaveTextContent("inside")
		expect(screen.queryByTestId("wrapped")).toBeNull()
	})

	test("renders children bare when false and no elseWrapper", () => {
		render(
			<ConditionalWrapper
				condition={ false }
				wrapper={ (children) => <div data-testid="wrapped">{ children }</div> }
			>
				<span>bare</span>
			</ConditionalWrapper>,
		)
		screen.getByText("bare")
		expect(screen.queryByTestId("wrapped")).toBeNull()
	})
})
