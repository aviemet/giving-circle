import { createInertiaApp, router } from "@inertiajs/react"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import { createRoot } from "react-dom/client"

import { LAYOUTS } from "../layouts"
import {
	applyPropsMiddleware,
	setupCSRFToken,
	setupInertiaListeners,
	handlePageLayout,
} from "./middleware"
import { runAxe } from "./middleware/axe"

const pages = import.meta.glob<PagesObject>("../pages/**/index.tsx")

dayjs.extend(localizedFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)

const SITE_TITLE = "Giving Circle"

export type PagesObject<T = any> = { default: React.ComponentType<T> & {
	layout?: React.ComponentType<T>
	defaultLayout?: keyof typeof LAYOUTS
} }

document.addEventListener("DOMContentLoaded", () => {
	setupCSRFToken()
	setupInertiaListeners(router)

	createInertiaApp({
		title: title => `${SITE_TITLE} - ${title}`,

		resolve: async name => {
			const page: PagesObject = (await pages[`../pages/${name}/index.tsx`]())

			return handlePageLayout(page)
		},

		setup({ el, App, props }) {
			const root = createRoot(el)

			props.initialPage.props = applyPropsMiddleware(props.initialPage.props)

			router.on("success", () => {
				runAxe(root)
			})

			runAxe(root)
			root.render(<App { ...props } />)
		},
	})
})
