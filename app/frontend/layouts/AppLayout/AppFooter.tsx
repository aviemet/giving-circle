import { Box, AppShell, Group } from "@/components"
import { ToggleColorSchemeButton } from "@/components/Button"

const FooterComponent = () => {
	return (
		<AppShell.Footer py={ 4 } px={ 8 } role="contentinfo">
			<Group>
				<div id="footer-portal" />
				<Box style={ { marginLeft: "auto" } }>
					©{ (new Date).getFullYear() }
					<ToggleColorSchemeButton />
				</Box>
			</Group>
		</AppShell.Footer>
	)
}

export default FooterComponent
