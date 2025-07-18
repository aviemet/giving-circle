import { showNotification } from "@mantine/notifications"
import React, { useEffect } from "react"

import { usePageProps } from "@/lib/hooks"
import { FlashMessage } from "@/types"

const Flash = () => {
	const { flash } = usePageProps()

	useEffect(() => {
		let key: keyof FlashMessage
		for(key in flash) {
			if(flash[key]) {
				let color
				switch(key) {
					case "alert":
						color = "red"
						break
					case "success":
						color = "green"
						break
					case "info":
						color = "blue"
						break
					case "warning":
						color = "yellow"
						break
				}

				showNotification({
					message: flash[key],
					color,
				})
			}
		}
	}, [flash])

	return (
		<></>
	)
}

export default Flash
