import { Link } from "@/components"
import { EditIcon } from "@/components/Icons"

import { LinkProps } from "../Link"

interface EditButtonProps extends Omit<LinkProps, "children"> {
	label?: string
}

const EditButton = ({ href, label }: EditButtonProps) => {
	return (
		<Link as="button" href={ href } aria-label={ `Edit ${label}` }><EditIcon /></Link>
	)
}

export default EditButton
