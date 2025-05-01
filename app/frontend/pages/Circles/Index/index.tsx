import { Title, Page, Container, Divider, Group, Stack } from "@/components"
import { NewButton } from "@/components/Button"
import { CardContainer, CircleCard, ThemeCard } from "@/features/Cards"
import { Routes } from "@/lib"

interface CircleIndexProps {
	circles: Schema.CirclesIndex[]
	pagination: Schema.Pagination
}

// @path: /circles
// @route: circles
const CirclesIndex = ({ circles }: CircleIndexProps) => {
	return (
		<Page
			title="Dashboard"
			hideNavMenu
		>
			<Container>
				<Group justify="space-between">
					<Title>Your Circles</Title>
					<NewButton href={ Routes.newCircle() } />
				</Group>
				<Divider />
				<CardContainer>
					{ circles.map(circle => {
						return (
							<CircleCard key={ circle.id } circle={ circle } />
						)
					}) }
				</CardContainer>
				{ /* <NewCard href={ Routes.newCircle() } /> */ }


				<Title>Recent Themes</Title>
				<Divider />
				{ circles.map(circle => {
					return (
						<Stack key={ circle.id }>
							{ circle.themes.length > 0 && <Title order={ 2 }>{ circle.name }</Title> }
							<CardContainer>
								{ circle.themes?.map(theme => (
									<ThemeCard key={ theme.id } theme={ theme } circle={ circle } />
								)) }
							</CardContainer>
						</Stack>
					)
				}) }
			</Container>
		</Page>
	)
}

export default CirclesIndex
