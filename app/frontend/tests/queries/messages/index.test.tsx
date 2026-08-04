import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import React from "react"
import { describe, expect, test } from "vitest"

import { Routes } from "@/lib"
import {
	usePresentationMessageStatus,
	useSendPresentationMessage,
} from "@/queries/messages"
import { server } from "@/tests/helpers/mockServer"

describe("queries/messages", () => {
	test("fetches presentation message status", async () => {
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
		)

		const client = new QueryClient({
			defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
		})
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={ client }>{ children }</QueryClientProvider>
		)

		const { result } = renderHook(
			() => usePresentationMessageStatus({
				circleSlug: "circle-1",
				presentationSlug: "pres-1",
				messageSlug: "msg-1",
			}),
			{ wrapper },
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})
		expect(result.current.data?.status).toBe("ready")
	})

	test("sends a presentation message", async () => {
		server.use(
			http.post(Routes.sendApiCirclePresentationMessage("circle-1", "pres-1", "msg-1"), () => {
				return HttpResponse.json({
					presentation_message: {
						slug: "msg-1",
						status: "sending",
						delivery_results: {},
					},
				}, { status: 202, statusText: "Accepted" })
			}),
		)

		const client = new QueryClient({
			defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
		})
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={ client }>{ children }</QueryClientProvider>
		)

		const { result } = renderHook(
			() => useSendPresentationMessage({
				params: {
					circleSlug: "circle-1",
					presentationSlug: "pres-1",
					messageSlug: "msg-1",
				},
			}),
			{ wrapper },
		)

		result.current.mutate(null)

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})
		expect(result.current.data?.status).toBe("sending")
	})
})
