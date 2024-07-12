import { usePage } from '@inertiajs/react'
import { PageProps, Errors, ErrorBag } from '@inertiajs/core'
import { FlashMessage } from '@/types'

export interface SharedInertiaProps extends PageProps {
	auth: {
		// form_authenticity_token: string
		user: Schema.UsersShare
	}
	circle: Schema.CirclesShare
	flash: FlashMessage
	errors: Errors & ErrorBag
	csrf_token?: string
}

const usePageProps = () => {
	return usePage<SharedInertiaProps>().props
}

export default usePageProps
