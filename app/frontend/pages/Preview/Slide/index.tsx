import { Head } from "@inertiajs/react"
import { Render } from "@puckeditor/core"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Box, Text } from "@/components"
import { config } from "@/components/VisualEditor/config"
import { type PuckSlideData } from "@/components/VisualEditor/lib/EditorSave/editorPersistence"
import {
	PresentationDataProvider,
	type PresentationDataValue,
} from "@/features/presentation"
import { withLayout } from "@/lib"
import { useMockCircle } from "@/queries"


const PREVIEW_STORAGE_KEY = "puck-preview-data"

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isPuckSlideData(value: unknown): value is PuckSlideData {
	return isRecord(value)
}

function isPreviewUpdateMessage(value: unknown): value is { type: "update", data: PuckSlideData } {
	if(!isRecord(value)) {
		return false
	}

	if(value.type !== "update") {
		return false
	}

	return isPuckSlideData(value.data)
}

// @path: /preview/slide
// @route: previewSlide
function getInitialSlideData(): PuckSlideData | undefined {
	if(typeof window === "undefined") return undefined

	try {
		const raw = window.sessionStorage.getItem(PREVIEW_STORAGE_KEY)
		if(!raw) return undefined
		const parsed: unknown = JSON.parse(raw)
		if(!isPuckSlideData(parsed)) {
			return undefined
		}

		return parsed
	} catch{
		return undefined
	}
}

const PreviewSlide = () => {
	const { t } = useTranslation()
	const { data: mockCircle, isLoading } = useMockCircle()
	const [slideData, setSlideData] = useState<PuckSlideData | undefined>(getInitialSlideData)

	useEffect(() => {
		if(typeof window === "undefined" || !("BroadcastChannel" in window)) return

		const channel = new BroadcastChannel("visual-editor-preview")

		channel.onmessage = (event) => {
			if(!isPreviewUpdateMessage(event.data)) {
				return
			}

			setSlideData(event.data.data)
		}

		return () => {
			channel.close()
		}
	}, [])

	if(!slideData) {
		return (
			<>
				<Head title={ t("presentations.slides.preview.title") } />
				<Box p="xl" style={ { minHeight: "100vh" } }>
					<Text>No preview data. Edit a slide and use “Open preview” to see it here.</Text>
				</Box>
			</>
		)
	}

	if(isLoading || mockCircle === undefined) {
		return (
			<Box p="xl" style={ { minHeight: "100vh" } }>
				<Text>Loading…</Text>
			</Box>
		)
	}

	const value: PresentationDataValue = {
		circle: mockCircle,
		theme: mockCircle.themes[0],
		presentation: {
			name: "Preview",
			orgs: mockCircle.orgs,
		},
	}

	return (
		<>
			<Head title={ t("presentations.slides.preview.title") } />
			<PresentationDataProvider value={ value }>
				<div style={ { width: "100%", minHeight: "100vh", height: "100vh", backgroundColor: "#000", overflow: "hidden" } }>
					<div style={ { width: "100%", height: "100%" } }>
						<Render
							config={ config }
							data={ slideData }
							metadata={ {} }
						/>
					</div>
				</div>
			</PresentationDataProvider>
		</>
	)
}

export default withLayout(PreviewSlide, "unformatted")
