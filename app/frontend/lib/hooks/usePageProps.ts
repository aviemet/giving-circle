import { PageProps, Errors, ErrorBag } from "@inertiajs/core"
import { usePage } from "@inertiajs/react"

import { FlashMessage } from "@/types"

import { urlParams } from "../routes"

type UrlParams = typeof urlParams

export interface InitialInertiaShareProps extends Omit<PageProps, "errors" | "params" | "flash"> {
	auth: {
		user: Schema.UsersInertiaShare
	}
	flash: FlashMessage

	errors: Errors & ErrorBag

	active_circle: Schema.CirclesInertiaShare | undefined
	active_theme: Schema.ThemesInertiaShare | undefined
	active_presentation: Schema.PresentationsInertiaShare | undefined
	circles: Schema.CirclesInertiaShare[] | undefined
	app_url: string

	params: Record<string, string>
}

export type UsePagePropsParams<T extends keyof UrlParams = keyof UrlParams> = InitialInertiaShareProps

export const usePageProps = <T extends keyof UrlParams = keyof UrlParams>(): InitialInertiaShareProps => {
	return usePage<InitialInertiaShareProps>().props
}
