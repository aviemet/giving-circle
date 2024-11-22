import React from 'react'
import { createInertiaApp, router } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { PublicLayout, AppLayout, AuthLayout, PresentationLayout, LayoutWrapper } from '../Layouts'
import { propsMiddleware } from './middleware'
import { runAxe } from './middleware/axe'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const SITE_TITLE = 'Giving Circle'

type PagesObject = { default: React.ComponentType<any> & {
	layout?: React.ComponentType<any>
} }

// Map of layout names to components
// This needs to manually be kept in sync with the definitions on the server
// app/controllers/concerns/inertia_share/layout.rb
const LAYOUT_COMPONENTS = {
	'AppLayout': AppLayout,
	'AuthLayout': AuthLayout,
	'PublicLayout': PublicLayout,
	'PresentLayout': PresentationLayout,
} as const

document.addEventListener('DOMContentLoaded', () => {
	createInertiaApp({
		title: title => `${SITE_TITLE} - ${title}`,

		resolve: async name => {
			const pages = import.meta.glob<PagesObject>('../Pages/**/index.tsx')
			const page = (await pages[`../Pages/${name}/index.tsx`]()).default

			page.layout = (page) => {
				const props = page.props
				let Layout = LAYOUT_COMPONENTS[props.layout as keyof typeof LAYOUT_COMPONENTS] || LAYOUT_COMPONENTS['AppLayout']

				return (
					<LayoutWrapper>
						<Layout>
							{ page }
						</Layout>
					</LayoutWrapper>
				)
			}

			return page
		},

		setup({ el, App, props }) {
			const root = createRoot(el)

			// Convert ISO strings from server to javascript Date objects
			props.initialPage.props = propsMiddleware(props.initialPage.props)

			root.render(<App { ...props } />)

			// Adds accessibility errors to console
			router.on('success', event => {
				event.detail.page.props = propsMiddleware(event.detail.page.props)
				runAxe(root)
			})
		},
	})
})
