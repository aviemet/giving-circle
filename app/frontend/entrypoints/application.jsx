import { createInertiaApp } from '@inertiajs/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import { PublicLayout, AppLayout } from '../Layouts'
import dynamicImport from '../dynamicImport'

document.addEventListener('DOMContentLoaded', () => {
	const csrfToken = document.querySelector('meta[name=csrf-token]').content
	axios.defaults.headers.common['X-CSRF-Token'] = csrfToken

	createInertiaApp({
		title: title => `Inventory - ${title}`,

		resolve: async name => {
			let checkedName = name
			let layout = AppLayout
			if(name.startsWith('Public/')) {
				layout = PublicLayout
				checkedName = name.replace('Public/', '')
			}

			const page = await dynamicImport(checkedName)
			if(page.layout === undefined) page.layout = layout

			return page
		},

		setup({ el, App, props }) {
			const root = createRoot(el)
			root.render(<App { ...props } />)
		},
	})
})
