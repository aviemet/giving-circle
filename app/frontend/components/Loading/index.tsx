import cx from "clsx"

import * as classes from "./Loading.css"

interface LoadingProps {
	text?: string
	className?: string
}

export const Loading = ({ text, className }: LoadingProps) => {
	return (
		<div className={ cx(classes.container, className) }>
			<div className={ classes.spinner } />
			{ text && <span className={ classes.text }>{ text }</span> }
		</div>
	)
}

export default Loading
