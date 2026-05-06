import { http, HttpResponse } from "msw"

import { Routes } from "@/lib"

export const handlers = [
	http.get(Routes.apiSearches(), () => {
		return HttpResponse.json([
			{
				id: 26,
				label: "iPhone 4",
				content: "iPhone 4 4WE3GN55 4WE3GN55",
				searchable_type: "Asset",
				searchable_id: 1,
				created_at: "2024-05-21T13:16:56.311-07:00",
				updated_at: "2024-05-21T13:16:56.311-07:00",
			},
			{
				id: 27,
				label: "iPhone 6S / 6S Plus",
				content: "iPhone 6S / 6S Plus 6FL77GXM 6FL77GXM",
				searchable_type: "Asset",
				searchable_id: 2,
				created_at: "2024-05-21T13:16:56.323-07:00",
				updated_at: "2024-05-21T13:16:56.323-07:00",
			},
		])
	}),
	http.get(Routes.apiCircleMock("circle-1"), () => {
		return HttpResponse.json({
			id: "circle-1",
			name: "Circle 1",
			slug: "circle-1",
			themes: [
				{
					id: "theme-1",
					name: "Theme 1",
					slug: "theme-1",
					status: "current",
				},
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
	}),
]
