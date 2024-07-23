import { usePage } from '@inertiajs/react'
import { PageProps, Errors, ErrorBag } from '@inertiajs/core'
import { FlashMessage } from '@/types'
import { urlParams } from '../routes'

type UrlParams = typeof urlParams;

interface InitialInertiaShareProps
	extends
	Omit<PageProps, 'errors'|'params'|'flash'>
{
	auth: {
		user: Schema.UsersInertiaShare
	}
	menu: {
		circles: Schema.CirclesInertiaShare[] | undefined
	}
	flash: FlashMessage
	errors: Errors & ErrorBag
	params: Record<string, string>
}

// Helper type to extract params array and convert it to an object type with string values
type ParamsObject<T extends readonly string[]> = {
	[K in T[number]]: string
}

interface UsePagePropsParams<T extends keyof UrlParams> extends InitialInertiaShareProps {
	params: ParamsObject<UrlParams[T]['params']>
}

const usePageProps = <T extends keyof UrlParams>(): UsePagePropsParams<T> => {
	const page = usePage<InitialInertiaShareProps>().props

	return page as UsePagePropsParams<T>
}

export default usePageProps
