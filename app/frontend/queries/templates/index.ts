import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"

import { type ReactMutationFunction } from ".."

interface CreateSlideData {
	title: string
	data?: Record<string, unknown>
}

export const useCreateTemplateSlide: ReactMutationFunction<
	Schema.Slide,
	CreateSlideData,
	{ circleSlug: string, templateSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.post(
				Routes.apiTemplateSlides(options.params.templateSlug),
				{ slide: data },
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201])) {
				throw new Error("Failed to create slide")
			}
			return res.data
		},
		mutationKey: ["template", options.params.templateSlug, "slides", "create"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["template", options.params.templateSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}

interface UpdateSlideData {
	title?: string
	data?: Record<string, unknown>
}

export const useUpdateTemplateSlide: ReactMutationFunction<
	Schema.Slide,
	UpdateSlideData,
	{ templateSlug: string, slideSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.patch(
				Routes.apiTemplateSlide(options.params.templateSlug, options.params.slideSlug),
				{
					slide: data,
				},
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201])) {
				throw new Error("Failed to update slide")
			}
			return res.data
		},
		mutationKey: ["template", options.params.templateSlug, "slides", options.params.slideSlug, "update"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["template", options.params.templateSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}
