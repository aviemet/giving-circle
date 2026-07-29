import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import React from "react"
import { describe, expect, test } from "vitest"

import { Routes } from "@/lib"
import { useUpdateInteractionMembershipVotes } from "@/queries/presentations/interactionMemberships"
import { useTogglePresentationInteraction } from "@/queries/presentations/interactions"
import { server } from "@/tests/helpers/mockServer"

describe("queries/presentations/interactions", () => {
	test("toggles accepting_responses", async () => {
		server.use(
			http.patch(Routes.apiCirclePresentationInteraction("circle-1", "pres-1", "interact-1"), () => {
				return HttpResponse.json({
					interaction: {
						id: "1",
						slug: "interact-1",
						name: "Allocate",
						accepting_responses: true,
					},
					interactions: [],
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
			() => useTogglePresentationInteraction({
				params: { circleSlug: "circle-1", presentationSlug: "pres-1" },
			}),
			{ wrapper },
		)

		result.current.mutate({
			interactionSlug: "interact-1",
			accepting_responses: true,
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})
		expect(result.current.data?.interaction.accepting_responses).toBe(true)
	})
})

describe("queries/presentations/interactionMemberships", () => {
	test("updates membership votes", async () => {
		server.use(
			http.patch(
				Routes.apiCirclePresentationInteractionMembership(
					"circle-1",
					"pres-1",
					"interact-1",
					"membership-1",
				),
				() => {
					return HttpResponse.json({
						membership: {
							id: "pim-1",
							membership_id: "membership-1",
							votes: 4,
						},
					}, { status: 200, statusText: "OK" })
				},
			),
		)

		const client = new QueryClient({
			defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
		})
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={ client }>{ children }</QueryClientProvider>
		)

		const { result } = renderHook(
			() => useUpdateInteractionMembershipVotes({
				params: {
					circleSlug: "circle-1",
					presentationSlug: "pres-1",
					interactionSlug: "interact-1",
				},
			}),
			{ wrapper },
		)

		result.current.mutate({ membershipId: "membership-1", votes: 4 })

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})
		expect(result.current.data?.membership.votes).toBe(4)
	})
})
