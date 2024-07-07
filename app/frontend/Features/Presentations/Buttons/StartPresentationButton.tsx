import React from 'react'
import { Tooltip, Button } from '@/Components'
import { PresentationIcon } from '@/Components/Icons'
import { ButtonProps } from '@mantine/core'

interface PresentationIconProps extends ButtonProps {
	presentation: Schema.PresentationsShallow
}

const StartPresentationButton = ({ presentation }: PresentationIconProps) => {
	const handleClick = () => {

	}

	return (
		<Tooltip label="Start Presentation">
			<Button onClick={ handleClick }>
				<PresentationIcon />
			</Button>
		</Tooltip>
	)
}

export default StartPresentationButton
