import { Menu, Tabs } from "@mantine/core"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, test } from "vitest"

import { DeleteButton } from "@/components/Button/DeleteButton"
import { NewButton } from "@/components/Button/NewButton"
import { ToggleColorSchemeButton } from "@/components/Button/ToggleColorSchemeButton"
import { FlexCurrencyFormatter } from "@/components/Formatters/Currency/FlexCurrency"
import { FlexMoney } from "@/components/Money/FlexMoney"
import { MenuItem } from "@/components/Menu/MenuItem"
import { TabsList } from "@/components/Tabs/TabsList"
import { UrlTabs } from "@/components/Tabs/UrlTabs"
import { FontSizeControl } from "@/components/VisualEditor/fields/font/FontSizeControl"
import { defaultFlexibleFontSize } from "@/components/VisualEditor/fields/font"
import { render } from "@/tests/helpers/utils"

describe("component smoke wrappers", () => {
	test("renders NewButton and DeleteButton", () => {
		render(
			<>
				<NewButton href="/new" label="Org" />
				<DeleteButton href="/delete" label="Org" />
			</>,
		)
		screen.getByLabelText("New Org")
		screen.getByLabelText("Delete Org")
	})

	test("renders ToggleColorSchemeButton", async () => {
		const user = userEvent.setup()
		render(<ToggleColorSchemeButton />)
		await user.click(screen.getByRole("button"))
	})

	test("renders FlexCurrency and FlexMoney", () => {
		const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
		render(
			<>
				<FlexCurrencyFormatter formatter={ formatter }>{ 12.5 }</FlexCurrencyFormatter>
				<FlexMoney formatter={ formatter } accounting>{ -3 }</FlexMoney>
				<FlexCurrencyFormatter formatter={ formatter }>{ 0 }</FlexCurrencyFormatter>
			</>,
		)
	})

	test("renders UrlTabs and TabsList", () => {
		render(
			<UrlTabs defaultValue="one">
				<TabsList>
					<Tabs.Tab value="one">One</Tabs.Tab>
				</TabsList>
			</UrlTabs>,
		)
	})

	test("renders MenuItem", () => {
		render(
			<Menu opened>
				<Menu.Dropdown>
					<MenuItem>Item</MenuItem>
				</Menu.Dropdown>
			</Menu>,
		)
		screen.getByText("Item")
	})

	test("renders FontSizeControl", () => {
		render(
			<FontSizeControl
				name="size"
				value={ defaultFlexibleFontSize("md") }
				onChange={ () => undefined }
				allowAuto
			/>,
		)
	})
})
