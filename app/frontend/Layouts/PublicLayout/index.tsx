import React from 'react'
import { useDisclosure } from '@/lib/hooks'
import { Group, Box, AppShell, Burger, Skeleton } from '@/Components'
import { CircleDotIcon } from '@/Components/Icons'
import { UserHeaderMenu } from '@/Features'

interface PublicLayoutProps {
	children: any
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
	const [opened, { toggle }] = useDisclosure()

	return (
		<AppShell
			header={ { height: { base: 30, md: 50, lg: 60 } } }
			navbar={ {
				width: { base: 100, md: 200, lg: 300 },
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			} }
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={ opened } onClick={ toggle } hiddenFrom="sm" size="sm" />
					<Box style={ { flex: 1 } }>
						<CircleDotIcon size={ 30 } />
					</Box>
					<Box>
						<UserHeaderMenu />
					</Box>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				Navigation
				{ Array(15)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={ index } h={ 28 } mt="sm" animate={ false } />
					)) }
			</AppShell.Navbar>
			<AppShell.Main>
				{ children }
			</AppShell.Main>
		</AppShell>
	)
}

export default PublicLayout
