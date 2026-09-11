import { renderHook } from "@testing-library/react"
import { type ReactNode } from "react"
import { describe, expect, test } from "vitest"

import { useResolvedTags } from "@/components/VisualEditor/lib/dynamicData"
import { resolveTagPath } from "@/components/VisualEditor/lib/dynamicData/useResolvedTags"
import { PresentationDataProvider, type PresentationDataContextValue } from "@/features/presentation/PresentationDataProvider"
import {
	createCircleMock,
	createPresentationOrgPersisted,
	createPresentationPresentation,
	createThemePersisted,
} from "@/tests/helpers/fixtures"

function tagContext(overrides?: Partial<PresentationDataContextValue>): PresentationDataContextValue {
	return {
		circle: createCircleMock({ name: "Giving Circle" }),
		theme: createThemePersisted({ name: "Allocation Night" }),
		presentation: createPresentationPresentation({ name: "Demo Night" }),
		values: undefined,
		elementControls: {},
		activeSlideId: undefined,
		isSubscribed: false,
		...overrides,
	}
}

describe("components/VisualEditor/lib/dynamicData/useResolvedTags", () => {
	test("leaves the token when there is no circle", () => {
		expect(resolveTagPath("circle.name", null, null)).toBe("#circle.name")
	})

	test("resolves circle, theme, and presentation fields", () => {
		const context = tagContext()

		expect(resolveTagPath("circle.name", context, null)).toBe("Giving Circle")
		expect(resolveTagPath("theme.name", context, null)).toBe("Allocation Night")
		expect(resolveTagPath("presentation.name", context, null)).toBe("Demo Night")
	})

	test("returns the token when the path does not exist", () => {
		expect(resolveTagPath("circle.missing", tagContext(), null)).toBe("#circle.missing")
	})

	test("resolves iterator collection fields against the current item", () => {
		const org = createPresentationOrgPersisted({ id: "org-a", name: "Org A" })

		expect(resolveTagPath(
			"presentation.org[].name",
			tagContext(),
			{
				pathPrefix: "presentation.org",
				currentItem: org,
				index: 0,
			},
		)).toBe("Org A")
	})

	test("useResolvedTags interpolates tags in a stored string", () => {
		const context = tagContext()

		function wrapper({ children }: { children: ReactNode }) {
			return (
				<PresentationDataProvider value={ {
					circle: context.circle,
					theme: context.theme,
					presentation: context.presentation,
					isEditor: true,
				} }>
					{ children }
				</PresentationDataProvider>
			)
		}

		const { result } = renderHook(() => useResolvedTags("Welcome to #circle.name"), { wrapper })
		expect(result.current).toBe("Welcome to Giving Circle")
	})
})
