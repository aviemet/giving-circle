import React, { useState } from 'react'
import { DoubleDownArrowIcon } from '@/Components/Icons'
import { ActionIcon, Paper, Transition, useMantineTheme, rem, px, Tooltip, Box } from '@mantine/core'
import { useLayoutStore } from '@/Layouts/Providers'
import { useBooleanToggle } from '@/lib/hooks'
import { useClickOutside } from '@mantine/hooks'

export { default as useAdvancedSearch } from './useAdvancedSearch'

const scaleY = {
	in: { opacity: 1, transform: 'scaleY(1)' },
	out: { opacity: 0, transform: 'scaleY(0)' },
	common: { transformOrigin: 'top' },
	transitionProperty: 'transform, opacity',
}

interface IAdvancedSearchProps {
	children: React.ReactNode
}

const AdvancedSearch = ({ children }: IAdvancedSearchProps) => {
	const { sidebarOpen } = useLayoutStore()
	const { primaryColor, other: { navbar: { width } } } = useMantineTheme()
	const navBarWidth = width[sidebarOpen ? 'open' : 'closed']

	const [open, toggleOpen] = useBooleanToggle(false)
	const [searchButton, setSearchButton] = useState<HTMLButtonElement | null>(null)
	const [searchPaper, setSearchPaper] = useState<HTMLDivElement | null>(null)
	useClickOutside(() => toggleOpen(false), null, [searchButton, searchPaper])

	return (
		<>
			<Tooltip
				withArrow
				label="Advanced Search"
				color={ primaryColor }
				position="left"
			>
				<ActionIcon
					size={ 42 }
					variant="filled"
					color="primary"
					onClick={ () => toggleOpen() }
					ref={ setSearchButton }
					data-ignore-outside-clicks
				 >
					<DoubleDownArrowIcon size={ 24 } />
				</ActionIcon>
			</Tooltip>
			<Transition
				mounted={ open }
				transition={ scaleY }
				duration={ 200 }
				timingFunction="ease"
			>
				{ (styles) => (
					<Paper
						ref={ setSearchPaper }
						shadow="md"
						p="md"
						style={ {
							...styles,
							position: 'absolute',
							left: rem(navBarWidth + px('1rem')),
							right: '1rem',
							top: searchButton ? rem(searchButton.getBoundingClientRect().bottom + 10) : undefined,
							zIndex: 10,
						} }
					>
						<Box>
							{ children }
						</Box>
					</Paper>
				) }
			</Transition>
		</>
	)
}

export default AdvancedSearch
