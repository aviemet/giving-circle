import { Box, Group, Flex, Title } from "@/components"
import { ToggleNavbarButton, UserHeaderMenu } from "@/features"
import { useLayoutStore } from "@/store"

export function AppHeader() {
	const sidebarOpen = useLayoutStore((state) => state.sidebarOpen)
	const siteTitle = useLayoutStore((state) => state.siteTitle)

	return (
		<Group h="100%" px="md">
			<Flex align="center" gap="md" style={ { flex: 1 } }>
				<ToggleNavbarButton hidden={ sidebarOpen } />
				{ typeof siteTitle === "string" ?
					<Title>{ siteTitle }</Title>
					:
					siteTitle
				}
			</Flex>

			<Box>
				<UserHeaderMenu />
			</Box>
		</Group>
	)
}
