import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"
import { SlideData } from "@/types/SlideData"

import { type ReactMutationFunction } from ".."

interface CreateSlideData {
	title: string
	data?: SlideData
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
				Routes.apiCircleTemplateSlides(options.params.circleSlug, options.params.templateSlug),
				{ slide: data },
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
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
	data?: SlideData
}

export const useUpdateTemplateSlide: ReactMutationFunction<
	Schema.Slide,
	UpdateSlideData,
	{ circleSlug: string, templateSlug: string, slideSlug: string }
> = (options) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.patch(
				Routes.apiCircleTemplateSlide(options.params.circleSlug, options.params.templateSlug, options.params.slideSlug),
				{
					slide: data,
				},
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
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
