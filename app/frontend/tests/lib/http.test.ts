import { describe, expect, test } from "vitest"

import {
	HTTP_STATUS,
	HttpStatusError,
	assertStatus,
	matchesStatus,
} from "@/lib/http"

describe("lib/http", () => {
	test("matchesStatus accepts a single code or list", () => {
		expect(matchesStatus(HTTP_STATUS.OK, HTTP_STATUS.OK)).toBe(true)
		expect(matchesStatus(HTTP_STATUS.CREATED, HTTP_STATUS.OK)).toBe(false)
		expect(matchesStatus(HTTP_STATUS.CREATED, [HTTP_STATUS.OK, HTTP_STATUS.CREATED])).toBe(true)
	})

	test("assertStatus passes and throws HttpStatusError", () => {
		assertStatus({ status: HTTP_STATUS.OK }, HTTP_STATUS.OK)
		assertStatus({ status: HTTP_STATUS.CREATED }, [HTTP_STATUS.OK, HTTP_STATUS.CREATED])

		try {
			assertStatus({ status: HTTP_STATUS.NOT_FOUND }, HTTP_STATUS.OK)
			expect.unreachable()
		} catch (error) {
			expect(error).toBeInstanceOf(HttpStatusError)
			if(error instanceof HttpStatusError) {
				expect(error.status).toBe(HTTP_STATUS.NOT_FOUND)
				expect(error.name).toBe("HttpStatusError")
				expect(error.message).toContain("404")
			}
		}
	})
})
