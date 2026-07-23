import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"

import { type ReactMutationFunction, type ReactQueryFunction } from ".."

export const useCircleFonts: ReactQueryFunction<
	Schema.CirclesFont[],
	{ circleSlug: string }
> = (params, options) => {
	return useQuery({
		queryKey: ["circle", params.circleSlug, "fonts"],
		queryFn: async () => {
			const res = await axios.get(Routes.apiCircleFonts(params.circleSlug))

			if(!isAllowedStatusCode(res.statusText, [200])) {
				throw new Error("Failed to fetch circle fonts")
			}

			return res.data
		},
		enabled: params.circleSlug.length > 0,
		...options,
	})
}

export const useAttachCircleFont: ReactMutationFunction<
	Schema.CirclesFont,
	{ signedId: string },
	{ circleSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ signedId }) => {
			const res = await axios.post(
				Routes.apiCircleFonts(options.params.circleSlug),
				{ signed_id: signedId },
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201])) {
				throw new Error("Failed to attach circle font")
			}

			return res.data
		},
		mutationKey: ["circle", options.params.circleSlug, "fonts", "create"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["circle", options.params.circleSlug, "fonts"] })
			options?.onSuccess?.(data, variables)
		},
	})
}
