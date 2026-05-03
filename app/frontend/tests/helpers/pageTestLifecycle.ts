import { afterEach, beforeEach } from "vitest"

import { createCircleInertiaShare, createThemeInertiaShare } from "./fixtures"
import { inertiaPageProps } from "./mockServer"

export function registerActiveCircleLifecycle(): void {
	beforeEach(() => {
		inertiaPageProps.active_circle = createCircleInertiaShare()
	})
	afterEach(() => {
		inertiaPageProps.active_circle = undefined
	})
}

export function registerActiveCircleAndThemeLifecycle(): void {
	beforeEach(() => {
		inertiaPageProps.active_circle = createCircleInertiaShare()
		inertiaPageProps.active_theme = createThemeInertiaShare()
	})
	afterEach(() => {
		inertiaPageProps.active_circle = undefined
		inertiaPageProps.active_theme = undefined
	})
}
