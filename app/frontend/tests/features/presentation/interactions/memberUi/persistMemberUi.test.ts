import { http, HttpResponse } from "msw"
import { describe, expect, test } from "vitest"

import { persistMemberUi } from "@/features/presentation/interactions/memberUi"
import { server } from "@/tests/helpers/mockServer"

describe("features/presentation/interactions/memberUi/persistMemberUi", () => {
	test("patches member_ui and resolves on OK", async () => {
		let body: unknown

		server.use(
			http.patch(/\/interactions\/pledges$/, async ({ request }) => {
				body = await request.json()
				return HttpResponse.json({}, { status: 200, statusText: "OK" })
			}),
		)

		await persistMemberUi("/interactions/pledges", "presentation_interaction", {
			root: { props: { title: "Pledges" } },
		})

		expect(body).toEqual({
			presentation_interaction: {
				member_ui: {
					root: { props: { title: "Pledges" } },
				},
			},
		})
	})

	test("rejects when the response is not a success status", async () => {
		server.use(
			http.patch(/\/interaction_templates\/allocation$/, () => {
				return HttpResponse.json({ errors: { member_ui: ["invalid"] } }, {
					status: 422,
					statusText: "Unprocessable Content",
				})
			}),
		)

		await expect(persistMemberUi(
			"/interaction_templates/allocation",
			"interaction_config_template",
			{},
		)).rejects.toThrow()
	})
})
