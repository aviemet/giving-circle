import {
	LAYOUTS,
	AuthLayout,
	PublicLayout,
	AppLayout,
	PresentationLayout,
	LayoutProps,
	UnformattedLayout,
	PublicPresentationLayout,
} from "@/layouts"

const LAYOUT_COMPONENTS: Record<keyof typeof LAYOUTS, ({ children }: LayoutProps) => React.JSX.Element> = {
	"auth": AuthLayout,
	"app": AppLayout,
	"presentation": PresentationLayout,
	"public": PublicLayout,
	"publicPresentation": PublicPresentationLayout,
	"unformatted": UnformattedLayout,
} as const

type LayoutKey = keyof typeof LAYOUTS

type PageComponent = React.ComponentType & {
	layout?: (children: React.ReactNode) => React.JSX.Element
	defaultLayout?: LayoutKey
}

export const handlePageLayout = (page: PageComponent) => {
	const layoutKey = page.defaultLayout ?? "app"
	const DefaultLayout = LAYOUT_COMPONENTS[layoutKey] ?? AppLayout
	page.layout ||= (children: React.ReactNode) => <DefaultLayout>{ children }</DefaultLayout>

	return page
}
