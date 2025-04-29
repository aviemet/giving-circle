import React from "react"

import FormConsumer from "./FormConsumer"

const ConsoleLogger = ({ key }: { key?: string }) => {
	return (
		<FormConsumer>
			{ ({ data }) => {
				console.log({ [key || "data"]: data })
				return <></>
			} }
		</FormConsumer>
	)
}

export default ConsoleLogger
