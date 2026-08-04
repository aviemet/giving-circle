import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import React from "react"
import { describe, expect, test } from "vitest"

import { SendMessageButton } from "@/components/Button/SendMessageButton"
import { Routes } from "@/lib"
import { server } from "@/tests/helpers/mockServer"
import { render } from "@/tests/helpers/utils"

describe("components/Button/SendMessageButton", () => {
	const labels = {
		ready: "Send",
		sending: "Sending",
		finished: "Finished",
	}

	function renderButton(ui: React.ReactElement) {
		const client = new QueryClient({
			defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
		})
		return render(
			<QueryClientProvider client={ client }>
				{ ui }
			</QueryClientProvider>,
		)
	}

	test("shows ready and posts on click", async () => {
		const user = userEvent.setup()
		let status = "ready"
		let postedBody: unknown
		server.use(
			http.get(Routes.apiCirclePresentationMessage("circle-1", "pres-1", "msg-1"), () => {
				return HttpResponse.json({
					presentation_message: {
						slug: "msg-1",
						status,
						delivery_results: {},
					},
				}, { status: 200, statusText: "OK" })
			}),
			http.post(Routes.sendApiCirclePresentationMessage("circle-1", "pres-1", "msg-1"), async ({ request }) => {
				postedBody = await request.json().catch(() => null)
				status = "sending"
				return HttpResponse.json({
					presentation_message: {
						slug: "msg-1",
						status: "sending",
						delivery_results: {},
					},
				}, { status: 202, statusText: "Accepted" })
			}),
		)

		renderButton(
			<SendMessageButton
				circleSlug="circle-1"
				presentationSlug="pres-1"
				messageSlug="msg-1"
				initialData={ {
					slug: "msg-1",
					status: "ready",
					delivery_results: {},
				} }
				labels={ labels }
			/>,
		)

		await user.click(screen.getByRole("button", { name: "Send" }))
		await waitFor(() => {
			expect(screen.getByRole("button", { name: "Sending" })).toBeDisabled()
		})
		expect(postedBody).toBeNull()
	})

	test("posts membership_ids when provided", async () => {
		const user = userEvent.setup()
		let postedBody: unknown
		server.use(
			http.get(Routes.apiCirclePresentationMessage("circle-1", "pres-1", "msg-1"), () => {
				return HttpResponse.json({
					presentation_message: {
						slug: "msg-1",
						status: "ready",
						delivery_results: {},
					},
				}, { status: 200, statusText: "OK" })
			}),
			http.post(Routes.sendApiCirclePresentationMessage("circle-1", "pres-1", "msg-1"), async ({ request }) => {
				postedBody = await request.json()
				return HttpResponse.json({
					presentation_message: {
						slug: "msg-1",
						status: "sending",
						delivery_results: {},
					},
				}, { status: 202, statusText: "Accepted" })
			}),
		)

		renderButton(
			<SendMessageButton
				circleSlug="circle-1"
				presentationSlug="pres-1"
				messageSlug="msg-1"
				membershipIds={ ["member-1"] }
				initialData={ {
					slug: "msg-1",
					status: "ready",
					delivery_results: {},
				} }
				labels={ labels }
			/>,
		)

		await user.click(screen.getByRole("button", { name: "Send" }))
		await waitFor(() => {
			expect(postedBody).toEqual({ membership_ids: ["member-1"] })
		})
	})

	test("shows finished when job is finished", () => {
		server.use(
			http.get(Routes.apiCirclePresentationMessage("circle-1", "pres-1", "msg-1"), () => {
				return HttpResponse.json({
					presentation_message: {
						slug: "msg-1",
						status: "finished",
						delivery_results: {},
					},
				}, { status: 200, statusText: "OK" })
			}),
		)

		renderButton(
			<SendMessageButton
				circleSlug="circle-1"
				presentationSlug="pres-1"
				messageSlug="msg-1"
				initialData={ {
					slug: "msg-1",
					status: "finished",
					delivery_results: {},
				} }
				labels={ labels }
			/>,
		)

		expect(screen.getByRole("button", { name: "Finished" })).toBeDisabled()
	})

	test("shows finished when delivery results exist", () => {
		server.use(
			http.get(Routes.apiCirclePresentationMessage("circle-1", "pres-1", "msg-1"), () => {
				return HttpResponse.json({
					presentation_message: {
						slug: "msg-1",
						status: "ready",
						delivery_results: { "member-1": { status: "sent" } },
					},
				}, { status: 200, statusText: "OK" })
			}),
		)

		renderButton(
			<SendMessageButton
				circleSlug="circle-1"
				presentationSlug="pres-1"
				messageSlug="msg-1"
				initialData={ {
					slug: "msg-1",
					status: "ready",
					delivery_results: { "member-1": { status: "sent" } },
				} }
				labels={ labels }
			/>,
		)

		expect(screen.getByRole("button", { name: "Finished" })).toBeDisabled()
	})
})
