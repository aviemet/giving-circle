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

	test("lists languages with native names and updates LocaleStore on select", async () => {
		const user = userEvent.setup()
		render(
			<MantineProvider>
				<LanguagePicker />
			</MantineProvider>,
		)

		const search = screen.getByLabelText(/search languages/i)
		await user.type(search, "de-DE")

		const germanGermany = await screen.findByRole("button", { name: /deutsch/i })
		expect(germanGermany.getAttribute("data-locale-id")).toBe("de-DE")
		expect(germanGermany).toHaveTextContent("German")
		await user.click(germanGermany)

		await waitFor(() => {
			expect(useLocaleStore.getState().locale).toBe("de-DE")
		})
	})

	test("shows Cantonese, American English, and a single Brazilian Portuguese entry", async () => {
		const user = userEvent.setup()
		render(
			<MantineProvider>
				<LanguagePicker />
			</MantineProvider>,
		)

		const search = screen.getByLabelText(/search languages/i)
		await user.type(search, "yue")

		const cantonese = await screen.findByRole("button", { name: /粵語|cantonese/i })
		expect(cantonese.getAttribute("data-locale-id")).toBe("zh-YUE")
		expect(cantonese).not.toHaveTextContent("zh-YUE")

		await user.clear(search)
		await user.type(search, "american english")

		const americanEnglish = await screen.findAllByRole("button", { name: /american english/i })
		expect(americanEnglish).toHaveLength(1)
		expect(americanEnglish[0].getAttribute("data-locale-id")).toBe("en-US")

		await user.clear(search)
		await user.type(search, "português (Brasil)")

		const brazilian = await screen.findAllByRole("button", { name: /português \(brasil\)/i })
		expect(brazilian).toHaveLength(1)
		expect(brazilian[0].getAttribute("data-locale-id")).toBe("pt-BR")
	})
})
