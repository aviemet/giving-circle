import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"

import { type ReactMutationFunction, type ReactQueryFunction } from ".."

export type PresentationMessageDeliveryResult = {
	recipient?: string | null
	status?: string
	code?: string
	error_message?: string
	skip_reason?: string
	provider_message_id?: string
}

export type PresentationMessageSendState = {
	slug: string
	status: string
	delivery_results: Record<string, PresentationMessageDeliveryResult>
}

type PresentationMessageSendResponse = {
	presentation_message: PresentationMessageSendState
	error?: string
}

type MessageParams = {
	circleSlug: string
	presentationSlug: string
	messageSlug: string
}

export type SendPresentationMessageVariables = {
	membership_ids?: string[]
} | null

export function presentationMessageQueryKey(params: MessageParams) {
	return [
		"presentation",
		params.presentationSlug,
		"messages",
		params.messageSlug,
	] as const
}

export const usePresentationMessageStatus: ReactQueryFunction<
	PresentationMessageSendState,
	MessageParams
> = (params, options) => {
	return useQuery({
		queryKey: presentationMessageQueryKey(params),
		queryFn: async () => {
			const res = await axios.get(
				Routes.apiCirclePresentationMessage(
					params.circleSlug,
					params.presentationSlug,
					params.messageSlug,
				),
			)

			if(!isAllowedStatusCode(res.statusText, [200])) {
				throw new Error("Failed to fetch presentation message status")
			}

			const body: PresentationMessageSendResponse = res.data
			return body.presentation_message
		},
		enabled: params.circleSlug.length > 0
			&& params.presentationSlug.length > 0
			&& params.messageSlug.length > 0,
		refetchInterval: (query) => {
			if(query.state.data?.status === "sending") return 1500
			return false
		},
		...options,
	})
}

export const useSendPresentationMessage: ReactMutationFunction<
	PresentationMessageSendState,
	SendPresentationMessageVariables,
	MessageParams
> = (options) => {
	const queryClient = useQueryClient()
	const queryKey = presentationMessageQueryKey(options.params)

	return useMutation({
		mutationFn: async (variables) => {
			const res = await axios.post(
				Routes.sendApiCirclePresentationMessage(
					options.params.circleSlug,
					options.params.presentationSlug,
					options.params.messageSlug,
				),
				variables?.membership_ids === undefined
					? undefined
					: { membership_ids: variables.membership_ids },
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
				const body: PresentationMessageSendResponse = res.data
				throw new Error(body.error || "Failed to send presentation message")
			}

			const body: PresentationMessageSendResponse = res.data
			return body.presentation_message
		},
		mutationKey: [...queryKey, "send"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.setQueryData(queryKey, data)
			queryClient.invalidateQueries({ queryKey })
			options?.onSuccess?.(data, variables)
		},
	})
}
