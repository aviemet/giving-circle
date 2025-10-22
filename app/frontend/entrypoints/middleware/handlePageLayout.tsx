import {
	LAYOUTS,
	AuthLayout,
	PublicLayout,
	AppLayout,
	SettingsLayout,
	PresentationLayout,
	LayoutProps,
	UnformattedLayout,
	PublicPresentationLayout,
} from "@/layouts"

import { PagesObject } from "../application"

const LAYOUT_COMPONENTS: Record<keyof typeof LAYOUTS, ({ children }: LayoutProps) => React.JSX.Element> = {
	"auth": AuthLayout,
	"app": AppLayout,
	"presentation": PresentationLayout,
	"settings": SettingsLayout,
	"public": PublicLayout,
	"publicPresentation": PublicPresentationLayout,
	"unformatted": UnformattedLayout,
} as const

const handlePageLayout = (page: PagesObject) => {
	const DefaultLayout = LAYOUT_COMPONENTS[page.default.defaultLayout as keyof typeof LAYOUTS] || AppLayout
	page.default.layout ||= (children: React.ReactNode) => <DefaultLayout>{ children }</DefaultLayout>

	return page.default
}

export default handlePageLayout
