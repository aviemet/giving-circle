import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { isAllowedStatusCode, Routes } from "@/lib"

import { ReactQueryFunction } from ".."

export const useMockCircle: ReactQueryFunction<Schema.Circle> = (options) => {
	return useQuery({
		queryKey: ["mock-circle"],
		queryFn: async() => {
			const res = await axios.get(Routes.apiCircleMock("mock-circle"))

			if(!isAllowedStatusCode(res.statusText, [200])) {
				throw new Error("Failed to fetch mock circle")
			}
			return res.data
		},
		...options,
	})
}
