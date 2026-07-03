import { Head } from "@inertiajs/react"
import { Config, Render } from "@measured/puck"
import { useState, useEffect } from "react"

import { Box, Text } from "@/components"
import { config } from "@/components/VisualEditor/puck.config"
import {
	PresentationDataProvider,
	type PresentationDataContextValue,
} from "@/layouts/Providers/PresentationDataProvider"
import { withLayout } from "@/lib"
import { useMockCircle } from "@/queries"


const PREVIEW_STORAGE_KEY = "puck-preview-data"

// @path: /preview/slide
// @route: previewSlide
function getInitialSlideData(): Record<string, unknown> | undefined {
	if(typeof window === "undefined") return undefined

	try {
		const raw = window.sessionStorage.getItem(PREVIEW_STORAGE_KEY)
		if(!raw) return undefined
		return JSON.parse(raw) as Record<string, unknown>
	} catch{
		return undefined
	}
}

const PreviewSlide = () => {
	const { data: mockCircle, isLoading } = useMockCircle()
	const [slideData, setSlideData] = useState<Record<string, unknown> | undefined>(getInitialSlideData)

	useEffect(() => {
		if(typeof window === "undefined" || !("BroadcastChannel" in window)) return

		const channel = new BroadcastChannel("visual-editor-preview")

		channel.onmessage = (event) => {
			const message = event.data
			if(!message || message.type !== "update") return

			setSlideData(message.data as Record<string, unknown>)
		}

		return () => {
			channel.close()
		}
	}, [])

	if(slideData && isLoading) {
		return (
			<Box p="xl" style={ { minHeight: "100vh" } }>
				<Text>Loading…</Text>
			</Box>
		)
	}

	if(!slideData) {
		return (
			<>
				<Head title="Slide preview" />
				<Box p="xl" style={ { minHeight: "100vh" } }>
					<Text>No preview data. Edit a slide and use “Open preview” to see it here.</Text>
				</Box>
			</>
		)
	}

	const circleMock = mockCircle as Schema.CirclesMock
	const value: PresentationDataContextValue = {
		circle: circleMock,
		theme: circleMock?.themes?.[0],
		presentation: {
			name: "Preview",
			orgs: circleMock?.orgs ?? [],
		} as Schema.PresentationsPresentation,
	}

	return (
		<>
			<Head title="Slide preview" />
			<PresentationDataProvider value={ value }>
				<div style={ { width: "100%", minHeight: "100vh", height: "100vh", backgroundColor: "#000", overflow: "hidden" } }>
					<div style={ { width: "100%", height: "100%" } }>
						<Render
							config={ config as Config }
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
