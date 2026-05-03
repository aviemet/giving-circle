import { createInertiaApp, router } from "@inertiajs/react"
import * as ActiveStorage from "@rails/activestorage"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import { createRoot } from "react-dom/client"

import {
	applyPropsMiddleware,
	handlePageLayout,
	setupCSRFToken,
	setupInertiaListeners,
} from "./middleware"

ActiveStorage.start()

dayjs.extend(localizedFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)

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
	resolve: async(name) => {
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
