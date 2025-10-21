import { useCallback, useMemo } from "react"

import { useMockDataContext } from ".."
import { parseContentToStructured } from "./contentParser"
import { buildDataStructure, dataAccess } from "./dataAccess"


export const useMockData = (content: string): string => {
	const mockData = useMockDataContext()

	const structuredContent = useMemo(() => {
		return parseContentToStructured(content)
	}, [content])

	const evaluateTag = useCallback((tagPath: string): string => {
		if(!mockData?.mockCircle) {
			return `#${tagPath}`
		}

		// Build data structure dynamically from dataAccess configuration
		const dataStructure = buildDataStructure(dataAccess, mockData)

		const pathParts = tagPath.split(".")
		let currentData: unknown = dataStructure

		for(const part of pathParts) {
			if(part.includes("[]")) {
				const arrayPart = part.replace("[]", "")
				if(currentData && typeof currentData === "object" && arrayPart in currentData) {
					const arrayValue = (currentData as Record<string, unknown>)[arrayPart]
					if(Array.isArray(arrayValue)) {
						currentData = arrayValue
						continue
					}
				}
			}

			if(currentData && typeof currentData === "object" && part in currentData) {
				currentData = (currentData as Record<string, unknown>)[part]
			} else {
				return `#${tagPath}`
			}
		}

		if(typeof currentData === "string" || typeof currentData === "number") {
			return String(currentData)
		}

		return `#${tagPath}`
	}, [mockData])

	return useMemo(() => {
		return structuredContent.blocks.map(block => {
			if(block.type === "mention") {
				const evaluatedValue = evaluateTag(block.tagPath)
				return evaluatedValue
			}
			return block.content
		}).join("")
	}, [structuredContent.blocks, evaluateTag])
}
