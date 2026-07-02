import { useCallback, useMemo } from "react"

import { usePresentationDataContext } from "@/layouts/Providers/PresentationDataProvider"

import { parseContentToStructured, renderStructuredContent } from "./contentParser"
import { buildDataStructure, dataAccess } from "./dataAccess"
import { useIteratorItemContext } from "./IteratorItemContext"


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
	const iteratorContext = useIteratorItemContext(false)

	const structuredContent = useMemo(() => {
		return parseContentToStructured(content)
	}, [content])

	const evaluateTag = useCallback((tagPath: string): string => {
		if(!contextData?.circle) {
			return `#${tagPath}`
		}

		const dataStructure = buildDataStructure(dataAccess, contextData)
		const pathParts = tagPath.split(".")
		let currentData: unknown = dataStructure
		let pathSoFar = ""

		for(let partIndex = 0; partIndex < pathParts.length; partIndex++) {
			const part = pathParts[partIndex]
			const segmentPath = pathSoFar ? `${pathSoFar}.${part}` : part

			if(part.includes("[]")) {
				const arrayPart = part.replace("[]", "")
				const fullPrefix = pathSoFar ? `${pathSoFar}.${arrayPart}` : arrayPart
				if(iteratorContext && iteratorContext.pathPrefix === fullPrefix) {
					const remainingParts = pathParts.slice(partIndex + 1)
					let itemValue: unknown = iteratorContext.currentItem
					for(const restPart of remainingParts) {
						if(itemValue && typeof itemValue === "object" && restPart in (itemValue as Record<string, unknown>)) {
							itemValue = (itemValue as Record<string, unknown>)[restPart]
						} else {
							return `#${tagPath}`
						}
					}
					if(typeof itemValue === "string" || typeof itemValue === "number") {
						return String(itemValue)
					}
					return `#${tagPath}`
				}
				if(currentData && typeof currentData === "object" && arrayPart in currentData) {
					const arrayValue = (currentData as Record<string, unknown>)[arrayPart]
					if(Array.isArray(arrayValue)) {
						currentData = arrayValue
						pathSoFar = fullPrefix
						continue
					}
				}
			}

			if(currentData && typeof currentData === "object" && part in currentData) {
				currentData = (currentData as Record<string, unknown>)[part]
				pathSoFar = segmentPath
			} else {
				return `#${tagPath}`
			}
		}

		if(typeof currentData === "string" || typeof currentData === "number") {
			return String(currentData)
		}

		return `#${tagPath}`
	}, [contextData, iteratorContext])

	return useMemo(
		() => renderStructuredContent(structuredContent, evaluateTag),
		[structuredContent, evaluateTag],
	)
}
