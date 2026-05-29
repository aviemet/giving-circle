import { http, HttpResponse } from "msw"

import { Routes } from "@/lib"

import { createCirclesOptions, createThemePersisted } from "./fixtures"

const mockCircleResponse = (slug: string): Schema.CirclesMock => ({
	id: slug,
	name: "Circle 1",
	slug,
	themes: [
		createThemePersisted({
			circle: createCirclesOptions({ id: slug, slug }),
		}),
	],
	orgs: [
		{
			id: "org-1",
			name: "Org 1",
			slug: "org-1",
		},
	],
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
]
