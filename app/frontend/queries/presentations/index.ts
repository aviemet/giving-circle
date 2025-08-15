import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"
import { SlideData } from "@/types/SlideData"

import { ReactMutationFunction } from ".."

interface CreateSlideData {
	title: string
	data?: Record<string, unknown>
}

export const useCreatePresentationSlide: ReactMutationFunction<
	Schema.Slide,
	CreateSlideData,
	{ circleSlug: string, presentationSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.post(
				Routes.apiCirclePresentationSlides(options.params.circleSlug, options.params.presentationSlug),
				{ slide: data },
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
				throw new Error("Failed to create slide")
			}
			return res.data
		},
		mutationKey: ["presentation", options.params.presentationSlug, "slides", "create"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["presentation", options.params.presentationSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}

interface UpdateSlideData {
	title?: string
	data?: SlideData
}

export const useUpdatePresentationSlide: ReactMutationFunction<
	Schema.Slide,
	UpdateSlideData,
	{ circleSlug: string, presentationSlug: string, slideSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.patch(
				Routes.apiCirclePresentationSlide(options.params.circleSlug, options.params.presentationSlug, options.params.slideSlug),
				{
					slide: data,
				},
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
				throw new Error("Failed to update slide")
			}
			return res.data
		},
		mutationKey: ["presentation", options.params.presentationSlug, "slides", options.params.slideSlug, "update"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["presentation", options.params.presentationSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}


export const useSyncPresentationTemplateSlides: ReactMutationFunction<
	Schema.Presentation,
	null,
	{ circleSlug: string, presentationSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.patch(
				Routes.apiCirclePresentationSyncSlides(options.params.circleSlug, options.params.presentationSlug)
			)
			if(!isAllowedStatusCode(res.statusText, [200, 201])) {
				throw new Error("Failed to sync slides")
			}
			return res.data
		},
		mutationKey: ["presentations", options.params.presentationSlug, "slides", "sync"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["presentation", options.params.presentationSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}

