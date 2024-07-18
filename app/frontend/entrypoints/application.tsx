import React from 'react'
import { createInertiaApp, router } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { PublicLayout, AppLayout, AuthLayout, PresentationLayout } from '../Layouts'
import { propsMiddleware } from './middleware'
import { runAxe } from './middleware/axe'

type PagesObject = { default: React.ComponentType<any> & {
	layout?: React.ComponentType<any>
} }

const pages = import.meta.glob<PagesObject>('../Pages/**/index.tsx')

document.addEventListener('DOMContentLoaded', () => {
	createInertiaApp({
		title: title => `Giving Circle - ${title}`,

		resolve: async name => {
			let checkedName = name
			let layout

			switch(name.substring(0, name.indexOf('/'))) {
				case 'Public':
					layout = PublicLayout
					checkedName = name.replace('Public/', '')
					break
				case 'Auth':
					layout = AuthLayout
					checkedName = name.replace('Auth/', '')
					break
				case 'Present':
					layout = PresentationLayout
					checkedName = name.replace('Present/', '')
					break
				default:
					layout = AppLayout
			}

			const page = (await pages[`../Pages/${checkedName}/index.tsx`]()).default

			if(page.layout === undefined) page.layout = layout

			return page
		},

		setup({ el, App, props }) {
			const root = createRoot(el)

			// Convert ISO strings from server to javascript Date objects
			props.initialPage.props = propsMiddleware(props.initialPage.props)

			root.render(<App { ...props } />)

			router.on('success', event => {
				event.detail.page.props = propsMiddleware(event.detail.page.props)
				runAxe(root)
			})
		},
	})
})
