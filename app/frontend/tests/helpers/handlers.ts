import { http, HttpResponse } from "msw"

import { Routes } from "@/lib"

import { createCirclesOptions, createThemePersisted } from "./fixtures"

const mockCircleResponse = (slug: string): Schema.CirclesMock => ({
	id: slug,
	name: "Circle 1",
	slug,
	finalist_count: 5,
	themes: [
		createThemePersisted({
			circle: createCirclesOptions({ id: slug, slug }),
		}),
	],
	orgs: Array.from({ length: 10 }, (_, index) => {
		const orgNumber = index + 1

		return {
			id: `mock-org-${orgNumber}`,
			name: `Mock Org ${orgNumber}`,
			slug: `mock-org-${orgNumber}`,
		}
	}),
	memberships: [
		{
			id: "membership-1",
			active: true,
			funds: { amount: 10, cents: 1000, currency_iso: "USD" },
			name: "Member 1",
			slug: "membership-1",
		},
	],
})

export const handlers = [
	http.get(Routes.apiCircleMock("circle-1"), () => {
		return HttpResponse.json(mockCircleResponse("circle-1"))
	}),
	http.get(Routes.apiCircleMock("mock-circle"), () => {
		return HttpResponse.json(mockCircleResponse("mock-circle"))
	}),
	http.get(/\/api\/circles\/[^/]+\/fonts$/, () => {
		return HttpResponse.json([])
	}),
]
