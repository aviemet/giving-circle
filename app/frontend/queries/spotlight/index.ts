import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { isAllowedStatusCode, Routes } from "@/lib"

import { ReactQueryFunction } from ".."

export type SpotlightSearchValues = {
	orgs: Schema.OrgsIndex[]
	themes: Schema.ThemesIndex[]
	memberships: Schema.MembershipsIndex[]
	templates: Schema.TemplatesIndex[]
	presentations: Schema.PresentationsIndex[]
}

type SpotlightQueryParams = {
	circleSlug: string
}

export const useGetSpotlightResults: ReactQueryFunction<SpotlightSearchValues, SpotlightQueryParams> = (
	{ circleSlug },
	options,
) => {
	return useQuery({
		queryKey: ["spotlight", circleSlug],
		queryFn: async () => {
			const res = await axios.get(Routes.apiCircleSpotlights(circleSlug))

			if(!isAllowedStatusCode(res.statusText, [200])) {
				throw new Error("Failed to fetch spotlight results")
			}

			return res.data
		},
		...options,
	})
}
