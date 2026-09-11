import { useCallback, useMemo } from "react"

import { usePresentationDataContext } from "@/features/presentation/PresentationDataProvider"

import { type IteratorItemContextValue, useIteratorItemContext } from "./IteratorItemContext"
import { parseContentToStructured, renderStructuredContent } from "./tagContent"
import { buildTagData } from "./tagSchema"

function isIndexable(value: object): value is Record<string, object | string | number | boolean | null | undefined> {
	return !Array.isArray(value)
}

export function resolveTagPath(
	tagPath: string,
	contextData: ReturnType<typeof usePresentationDataContext> | null | undefined,
	iteratorContext: IteratorItemContextValue | null,
): string {
	if(!contextData?.circle) {
		return `#${tagPath}`
	}

	const data = buildTagData(contextData)
	const pathParts = tagPath.split(".")
	let currentData: object | string | number | boolean | null | undefined = data
	let pathSoFar = ""

	for(let partIndex = 0; partIndex < pathParts.length; partIndex++) {
		const part = pathParts[partIndex]
		const segmentPath = pathSoFar ? `${pathSoFar}.${part}` : part

		if(part.includes("[]")) {
			const arrayPart = part.replace("[]", "")
			const fullPrefix = pathSoFar ? `${pathSoFar}.${arrayPart}` : arrayPart
			if(iteratorContext && iteratorContext.pathPrefix === fullPrefix) {
				const remainingParts = pathParts.slice(partIndex + 1)
				let itemValue: object | string | number | boolean | null | undefined = iteratorContext.currentItem
				for(const restPart of remainingParts) {
					if(itemValue !== null && itemValue !== undefined && typeof itemValue === "object" && isIndexable(itemValue) && restPart in itemValue) {
						itemValue = itemValue[restPart]
					} else {
						return `#${tagPath}`
					}
				}
				if(typeof itemValue === "string" || typeof itemValue === "number") {
					return String(itemValue)
				}
				return `#${tagPath}`
			}
			if(currentData !== null && currentData !== undefined && typeof currentData === "object" && isIndexable(currentData) && arrayPart in currentData) {
				const arrayValue: object | string | number | boolean | null | undefined = currentData[arrayPart]
				if(Array.isArray(arrayValue)) {
					currentData = arrayValue
					pathSoFar = fullPrefix
					continue
				}
			}
		}

		if(currentData !== null && currentData !== undefined && typeof currentData === "object" && isIndexable(currentData) && part in currentData) {
			currentData = currentData[part]
			pathSoFar = segmentPath
		} else {
			return `#${tagPath}`
		}
	}

	if(typeof currentData === "string" || typeof currentData === "number") {
		return String(currentData)
	}

	return `#${tagPath}`
}

export function useResolvedTags(content: string): string {
	const contextData = usePresentationDataContext()
	const iteratorContext = useIteratorItemContext(false)

	const structuredContent = useMemo(() => {
		return parseContentToStructured(content)
	}, [content])

	const evaluateTag = useCallback((tagPath: string): string => {
		return resolveTagPath(tagPath, contextData, iteratorContext)
	}, [contextData, iteratorContext])

	return useMemo(
		() => renderStructuredContent(structuredContent, evaluateTag),
		[structuredContent, evaluateTag],
	)
}
