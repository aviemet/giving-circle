import { Link } from "@inertiajs/react"
import { Button, ButtonProps } from "@mantine/core"
import React, { forwardRef } from "react"

interface ButtonLinkProps
	extends ButtonProps,
	Omit<React.ComponentPropsWithoutRef<typeof Link>, "color" | "size" | "style"> {}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>((props, ref) => (
	<Button { ...props } ref={ ref } component={ Link } />
))

export default ButtonLink
