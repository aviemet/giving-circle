import { Routes } from "@/lib"

const TAG_PATTERN = /#([a-z0-9_.]+)/gi

export interface MessagingPreviewValues {
	"circle.name": string
	"presentation.name": string
	"membership.name": string
	interact_url: string
}

function absoluteAppUrl(appUrl: string, path: string) {
	const origin = appUrl.replace(/\/$/, "")
	const normalizedPath = path.startsWith("/") ? path : `/${path}`
	return `${origin}${normalizedPath}`
}

export function messagingPreviewValues(
	mockCircle: Schema.CirclesMock,
	appUrl: string,
): MessagingPreviewValues {
	const membership = mockCircle.memberships[0]
	const interactPath = Routes.circlePresentationInteract(mockCircle.slug, "preview")

	return {
		"circle.name": mockCircle.name,
		"presentation.name": mockCircle.themes[0]?.name ?? "Preview",
		"membership.name": membership?.name ?? "Sample Member",
		interact_url: absoluteAppUrl(appUrl, interactPath),
	}
}

export function renderMessagingPreview(
	templateString: string,
	values: MessagingPreviewValues,
): string {
	if(!templateString) return ""

	return templateString.replace(TAG_PATTERN, (match, key: string) => {
		const path = key.toLowerCase()
		if(path === "circle.name") return values["circle.name"]
		if(path === "presentation.name") return values["presentation.name"]
		if(path === "membership.name") return values["membership.name"]
		if(path === "interact_url") return values.interact_url
		return match
	})
}
