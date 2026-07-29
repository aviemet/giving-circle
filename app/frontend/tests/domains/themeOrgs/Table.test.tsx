import React from "react"
import { describe, expect, test } from "vitest"

import { ThemeOrgTable } from "@/domains/themeOrgs/Table"
import {
	createCircleInertiaShare,
	createPagination,
	createThemeInertiaShare,
	createThemesOrgsShow,
} from "@/tests/helpers/fixtures"
import { render } from "@/tests/helpers/utils"

describe("domains/themeOrgs/Table", () => {
	test("mounts with records", () => {
		render(
			<ThemeOrgTable
				circle={ createCircleInertiaShare() }
				theme={ createThemeInertiaShare() }
				records={ [createThemesOrgsShow()] }
				pagination={ createPagination({ count: 1 }) }
				model="theme_orgs"
			/>,
		)
		expect(document.body).toBeTruthy()
	})
})
