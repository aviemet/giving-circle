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

const pages = import.meta.glob<PagesObject>('../Pages/**/index.tsx')

document.addEventListener('DOMContentLoaded', () => {
	createInertiaApp({
		title: title => `${SITE_TITLE} - ${title}`,

		resolve: async name => {
			let Layout

			/**
				* Inertia doesn't provide a good way to specify Layout templates,
				* so inferring from the render path is the best option we have at the moment
				*/
			switch(name.substring(0, name.indexOf('/'))) {
				case 'Public':
					Layout = PublicLayout
					break
				case 'Auth':
					Layout = AuthLayout
					break
				case 'Present':
					Layout = PresentationLayout
					break
				default:
					Layout = AppLayout
			}

			const page = (await pages[`../Pages/${name}/index.tsx`]()).default

			if(page.layout === undefined) page.layout = (page) => <LayoutWrapper>
				<Layout children={ page } />
			</LayoutWrapper>

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
