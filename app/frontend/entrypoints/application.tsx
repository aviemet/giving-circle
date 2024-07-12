import React from 'react'
import { createInertiaApp, router } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import { PublicLayout, AppLayout, AuthLayout, PresentationLayout } from '../Layouts'
import { propsMiddleware } from './middleware'
import { runAxe } from './middleware/axe'

type PagesObject = { default: React.ComponentType<any> & {
	layout?: React.ComponentType<any>
} }

const pages = import.meta.glob<PagesObject>('../Pages/**/index.tsx')

document.addEventListener('DOMContentLoaded', () => {
	// Set axios csrf token from Rails meta tag
	const csrfToken = (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement).content
	axios.defaults.headers.common['X-CSRF-Token'] = csrfToken

	// Update csrf token when session token changes
	axios.interceptors.response.use(response => {
		const csrfToken = response.headers['x-csrf-token']
		if(csrfToken) {
			axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
			document.querySelector('meta[name=csrf-token]')?.setAttribute('content', csrfToken)
		}
		return response
	})

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

			// Convert SO strings from server to javascript Date objects
			props.initialPage.props = propsMiddleware(props.initialPage.props)

			root.render(<App { ...props } />)

			router.on('success', event => {
				event.detail.page.props = propsMiddleware(event.detail.page.props)
				runAxe(root)
			})
		},
	})
})
