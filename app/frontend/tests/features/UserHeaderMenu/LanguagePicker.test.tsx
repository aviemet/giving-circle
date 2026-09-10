import { MantineProvider } from "@mantine/core"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, test } from "vitest"

import { LanguagePicker } from "@/features/UserHeaderMenu/LanguagePicker"
import { useLocaleStore } from "@/store/LocaleStore"

describe("LanguagePicker", () => {
	beforeEach(async () => {
		await useLocaleStore.getState().setLocale("en")
	})

	test("lists exported languages and keeps LocaleStore on the selected id", async () => {
		const user = userEvent.setup()
		render(
			<MantineProvider>
				<LanguagePicker />
			</MantineProvider>,
		)

		const english = await screen.findByRole("button", { name: /english/i })
		expect(english.getAttribute("data-locale-id")).toBe("en")
		await user.click(english)

		await waitFor(() => {
			expect(useLocaleStore.getState().locale).toBe("en")
		})
	})

	test("filters the list by search", async () => {
		const user = userEvent.setup()
		render(
			<MantineProvider>
				<LanguagePicker />
			</MantineProvider>,
		)

		const search = screen.getByLabelText(/search languages/i)
		await user.type(search, "english")

		const matches = await screen.findAllByRole("button", { name: /english/i })
		expect(matches).toHaveLength(1)
		expect(matches[0].getAttribute("data-locale-id")).toBe("en")

		await user.clear(search)
		await user.type(search, "zzzz")
		expect(screen.queryByRole("button", { name: /english/i })).not.toBeInTheDocument()
	})
})
