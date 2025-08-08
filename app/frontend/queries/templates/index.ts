import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { exclude, Routes } from "@/lib"

import { type ReactMutationFunction } from ".."

interface Slide {
	id: string | number
	name: string
	order: number
}

export const useUpdateTemplateSlides: ReactMutationFunction<Schema.Template, Slide[], { circleSlug: string, templateSlug: string }> = (
	options,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.patch(Routes.circleTemplate(options.params.circleSlug, options.params.templateSlug), {
				template: { slides: data },
			})
			if(res.statusText !== "OK") {
				throw new Error("Failed to update template slides")
			}
			return res.data
		},
		mutationKey: ["template", options.params.circleSlug, options.params.templateSlug, "slides"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["template", options.params.circleSlug, options.params.templateSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}

export const useUpdateTemplateSlide: ReactMutationFunction<Schema.Template, { id: number, slide: Slide }, { circleSlug: string, templateSlug: string }> = (
	options,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.patch(Routes.circleTemplate(options.params.circleSlug, options.params.templateSlug), {
				template: {
					slides: {
						slide_index: data.id,
						slide: data.slide,
					},
				},
			})
			if(res.statusText !== "OK") {
				throw new Error("Failed to update template slide")
			}
			return res.data
		},
		mutationKey: ["template", options.params.circleSlug, options.params.templateSlug, "slide"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["template", options.params.circleSlug, options.params.templateSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}

export const useAddTemplateSlide: ReactMutationFunction<Schema.Template, Slide, { circleSlug: string, templateSlug: string }> = (
	options,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(data) => {
			const res = await axios.patch(Routes.circleTemplate(options.params.circleSlug, options.params.templateSlug), {
				template: {
					slides: {
						action: "add",
						slide: data,
					},
				},
			})
			if(res.statusText !== "OK") {
				throw new Error("Failed to add template slide")
			}
			return res.data
		},
		mutationKey: ["template", options.params.circleSlug, options.params.templateSlug, "add_slide"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["template", options.params.circleSlug, options.params.templateSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}

export const useRemoveTemplateSlide: ReactMutationFunction<Schema.Template, number, { circleSlug: string, templateSlug: string }> = (
	options,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async(slideIndex) => {
			const res = await axios.patch(Routes.circleTemplate(options.params.circleSlug, options.params.templateSlug), {
				template: {
					slides: {
						action: "remove",
						slide_index: slideIndex,
					},
				},
			})
			if(res.statusText !== "OK") {
				throw new Error("Failed to remove template slide")
			}
			return res.data
		},
		mutationKey: ["template", options.params.circleSlug, options.params.templateSlug, "remove_slide"],
		...exclude(options, "params"),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["template", options.params.circleSlug, options.params.templateSlug, "slides"] })
			options?.onSuccess?.(data, variables)
		},
	})
}
