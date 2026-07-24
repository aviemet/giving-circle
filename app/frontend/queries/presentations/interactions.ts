import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"

import { ReactMutationFunction } from ".."

export interface PresentationInteractionControlsState {
	id: string
	slug: string
	name: string
	accepting_responses: boolean
}

interface TogglePresentationInteractionData {
	interactionSlug: string
	accepting_responses: boolean
}

export interface TogglePresentationInteractionResult {
	interaction: PresentationInteractionControlsState
	interactions: PresentationInteractionControlsState[]
}

export const useTogglePresentationInteraction: ReactMutationFunction<
	TogglePresentationInteractionResult,
	TogglePresentationInteractionData,
	{ circleSlug: string, presentationSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data) => {
			const res = await axios.patch(
				Routes.apiCirclePresentationInteraction(
					options.params.circleSlug,
					options.params.presentationSlug,
					data.interactionSlug,
				),
				{
					presentation_interaction: {
						accepting_responses: data.accepting_responses,
					},
				},
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
				throw new Error("Failed to toggle interaction")
			}
			return res.data
		},
		mutationKey: [
			"presentation",
			options.params.presentationSlug,
			"interactions",
			"toggle",
		],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["presentation", options.params.presentationSlug, "interactions"],
			})
			options?.onSuccess?.(data, variables)
		},
	})
}
