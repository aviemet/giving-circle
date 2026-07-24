import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"

import { ReactMutationFunction } from ".."

interface UpdateInteractionMembershipVotesData {
	membershipId: string
	votes: number
}

interface UpdateInteractionMembershipVotesResult {
	membership: {
		id: string
		membership_id: string
		votes: number
	}
}

export const useUpdateInteractionMembershipVotes: ReactMutationFunction<
	UpdateInteractionMembershipVotesResult,
	UpdateInteractionMembershipVotesData,
	{ circleSlug: string, presentationSlug: string, interactionSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data) => {
			const res = await axios.patch(
				Routes.apiCirclePresentationInteractionMembership(
					options.params.circleSlug,
					options.params.presentationSlug,
					options.params.interactionSlug,
					data.membershipId,
				),
				{
					presentation_interaction_membership: {
						votes: data.votes,
					},
				},
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
				throw new Error("Failed to update interaction membership votes")
			}
			return res.data
		},
		mutationKey: [
			"presentation",
			options.params.presentationSlug,
			"interactions",
			options.params.interactionSlug,
			"memberships",
			"votes",
		],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["presentation", options.params.presentationSlug, "members"],
			})
			options?.onSuccess?.(data, variables)
		},
	})
}
