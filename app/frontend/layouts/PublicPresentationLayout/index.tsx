import { usePage } from "@inertiajs/react"

import { PresentationDataProvider } from "@/layouts/Providers/PresentationDataProvider"

import { LayoutProps } from ".."

export function PublicPresentationLayout({ children }: LayoutProps) {
	const { props } = usePage<{
		presentation?: Schema.PresentationsPresentation
		circle?: Schema.CirclesPersisted
		theme?: Schema.ThemesPersisted
	}>()

	const { presentation, circle, theme } = props

	if(!circle || !presentation) {
		return <>{ children }</>
	}

	return (
		<PresentationDataProvider value={ { circle, theme, presentation } }>
			{ children }
		</PresentationDataProvider>
	)
}
