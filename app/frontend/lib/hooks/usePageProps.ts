import { usePage } from '@inertiajs/react'
import { PageProps, Errors, ErrorBag } from '@inertiajs/core'
import { FlashMessage } from '@/types'

interface InitialInertiaShareProps extends PageProps {
	auth: {
		user: Schema.UsersInertiaShare
	}
	circle: Schema.CirclesInertiaShare
	flash: FlashMessage
	errors: Errors & ErrorBag
	params: Record<string, string>
}

const usePageProps = () => {
	return usePage<InitialInertiaShareProps>().props
}

export default usePageProps
