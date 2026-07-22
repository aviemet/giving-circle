import { createInertiaApp, router } from "@inertiajs/react"
import * as ActiveStorage from "@rails/activestorage"
import { createRoot } from "react-dom/client"

import "@/lib/dayjs"
import { bindLocaleStoreToI18n } from "@/store"

import {
	applyPropsMiddleware,
	handlePageLayout,
	setupCSRFToken,
	setupInertiaListeners,
} from "./middleware"

ActiveStorage.start()
bindLocaleStoreToI18n()

const SITE_TITLE = "Giving Circle"

export type PagesObject<T = object> = { default: React.ComponentType<T> & {
	layout?: (children: React.ReactNode) => React.JSX.Element
	defaultLayout?: keyof typeof import("../layouts").LAYOUTS
} }

type PageModule = { default: React.ComponentType }
const pages = import.meta.glob<PageModule>("../pages/**/index.tsx")

setupCSRFToken()
setupInertiaListeners(router)

createInertiaApp({
	title: title => `${SITE_TITLE} - ${title}`,
	resolve: async (name) => {
		const pageImporter = pages[`../pages/${name}/index.tsx`]

		const module = await pageImporter()
		return handlePageLayout(module.default)
	},

	setup({ el, App, props }) {
		if(!el) return
		props.initialPage.props = applyPropsMiddleware(props.initialPage.props)
		createRoot(el).render(<App { ...props } />)
	},
})
