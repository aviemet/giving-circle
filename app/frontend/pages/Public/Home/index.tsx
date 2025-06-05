import { Box, Title, Text } from "@/components"
import { withLayout } from "@/lib"

// @path: /
// @route: root
const Home = () => {
	return (
		<Box>
			<Title>Giving Circle</Title>
			<Text>This is a placeholder page for the public section of the application.</Text>
		</Box>
	)
}

export default withLayout(Home, "public")
