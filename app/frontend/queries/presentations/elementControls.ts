import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { exclude, isAllowedStatusCode, Routes } from "@/lib"
import { type ElementControlsPayload } from "@/types/ElementControlsPayload"

import { ReactMutationFunction } from ".."

export interface UpdateElementControlData {
	slideId: string
	elementId: string
	elementType: string
	control: string
	value: Record<string, number | string>
}

export interface UpdateElementControlResult {
	element_controls: ElementControlsPayload
}

export const useUpdateElementControl: ReactMutationFunction<
	UpdateElementControlResult,
	UpdateElementControlData,
	{ circleSlug: string, presentationSlug: string }
> = (options) => {
	return useMutation({
		mutationFn: async (data) => {
			const res = await axios.patch(
				Routes.apiCirclePresentationElementControls(
					options.params.circleSlug,
					options.params.presentationSlug,
				),
				{
					element_control: {
						slide_id: data.slideId,
						element_id: data.elementId,
						element_type: data.elementType,
						control: data.control,
						value: data.value,
					},
				},
			)

			if(!isAllowedStatusCode(res.statusText, [200, 201, 202])) {
				throw new Error("Failed to update element control")
			}
			return res.data
		},
		mutationKey: [
			"presentation",
			options.params.presentationSlug,
			"element_controls",
		],
		...exclude(options, "params"),
	})
}
