import clsx from "clsx"
import { type Ref } from "react"

import { Link } from "@/components"
import { type LinkProps } from "@/components/Link"


interface SettingsNavLinkProps extends LinkProps {}

type SettingsNavLinkPropsWithRef = SettingsNavLinkProps & {
	ref?: Ref<HTMLAnchorElement>
}

export function SettingsNavLink({ children, underline = "never", ref, ...props }: SettingsNavLinkPropsWithRef) {
	return <Link
		ref={ ref }
		underline={ underline }
		{ ...props }
	>
		<span className={ clsx("controlLabel") }>{ children }</span>
	</Link>
}
