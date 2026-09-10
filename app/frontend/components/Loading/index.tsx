import clsx from "clsx"

import * as classes from "./Loading.css"

interface LoadingProps {
	text?: string
	className?: string
}

export const Loading = ({ text, className }: LoadingProps) => {
	return (
		<div className={ clsx(classes.container, className) }>
			<div className={ clsx(classes.spinner) } />
			{ text && <span className={ clsx(classes.text) }>{ text }</span> }
		</div>
	)
}
