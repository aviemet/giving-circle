import { usePage } from '@inertiajs/react'
import { PageProps, Errors, ErrorBag } from '@inertiajs/core'
import { FlashMessage } from '@/types'

const urlParams = {
	circle: {
		path: '/circles/:circle_slug',
		params: ['circle_slug'],
	},
	circles: {
		path: '/circles',
		params: [],
	},
	newCircleMember: {
		path: '/circles/:circle_slug/members/new',
		params: ['circle_slug'],
	},
	circleTheme: {
		path: '/circles/:circle_slug/themes/:slug',
		params: ['circle_slug', 'slug'],
	},
} as const

type UrlParams = typeof urlParams

interface InitialInertiaShareProps extends PageProps {
	auth: {
		user: Schema.UsersInertiaShare
	}
	circle: Schema.CirclesInertiaShare
	flash: FlashMessage
	errors: Errors & ErrorBag
	params: Record<string, string>
}

// Helper type to extract params array and convert it to an object type with string values
type ParamsObject<T extends readonly string[]> = {
	[K in T[number]]: string
}

type UsePagePropsParams<T extends keyof UrlParams> = Omit<InitialInertiaShareProps, 'params'> & {
	params: ParamsObject<UrlParams[T]['params']>
}

const usePageProps = <T extends keyof UrlParams>(): UsePagePropsParams<T> => {
	const page = usePage<InitialInertiaShareProps>().props

	return page as unknown as UsePagePropsParams<T>
}

export default usePageProps
