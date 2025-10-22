import { useCallback, useMemo } from "react"

import { usePresentationDataContext } from "@/layouts/Providers/PresentationDataProvider"

import { parseContentToStructured } from "./contentParser"
import { buildDataStructure, dataAccess } from "./dataAccess"


/**
 * Transforms content containing dynamic data tags into resolved content with actual values.
 *
 * This hook enables the visual editor to display real presentation data in place of template tags.
 * When presentation context is unavailable (e.g., during editing), tags are preserved as-is.
 *
 * @param content - String containing embedded data tags (e.g., "Welcome to #circle.name")
 * @returns Processed string with tags replaced by their corresponding data values
 */
export const usePresentationData = (content: string): string => {
	const contextData = usePresentationDataContext()

	const structuredContent = useMemo(() => {
		return parseContentToStructured(content)
	}, [content])

	/**
	 * Resolves a dot-notated tag path to its actual value from the presentation data structure.
	 * Returns the original tag if the path cannot be resolved or data is unavailable.
	 */
	const evaluateTag = useCallback((tagPath: string): string => {
		if(!contextData?.circle) {
			return `#${tagPath}`
		}

		const dataStructure = buildDataStructure(dataAccess, contextData)

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
	}, [contextData])

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
