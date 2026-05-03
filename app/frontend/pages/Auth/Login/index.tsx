import clsx from "clsx"

import { Title, Link, Box, Paper, SimpleGrid, Grid, Flex } from "@/components"
import { Form, Submit } from "@/components/Form"
import { Checkbox, PasswordInput, TextInput } from "@/components/Inputs"
import { Routes, withLayout } from "@/lib"

import * as classes from "./Login.css"

type LoginFormData = {
	user: {
		email: string
		password: string
		remember_me: boolean
	}
}

const defaultData: LoginFormData = {
	user: {
		email: "",
		password: "",
		remember_me: false,
	},
}

// @path: /login
// @route: newUserSession
const Login = () => {
	return (
		<SimpleGrid cols={ { sm: 1, md: 2 } } spacing={ 0 } className={ clsx(classes.authLayout) }>
			<Box id="auth-layout-left">
				<Paper shadow="lg" radius="lg" p="xl" withBorder>

					<Box mb="md">
						<Title>Giving Circle</Title>
					</Box>

					<Form<LoginFormData>
						action={ Routes.newUserSession() }
						method="post"
						initialData={ defaultData }
					>
						<Grid>
							<Grid.Col>
								<TextInput
									name="user.email"
									placeholder="Email"
									autoComplete="Email"
									required
									pattern=".+@.+\..+"
								/>
							</Grid.Col>

							<Grid.Col>
								<PasswordInput
									name="user.password"
									placeholder="Password"
									autoComplete="current-password"
									required
								/>
							</Grid.Col>

							<Grid.Col>
								<Submit>Log In</Submit>
							</Grid.Col>

							<Grid.Col>
								<Checkbox name="user.remember_me" label="Remember Me" />
							</Grid.Col>

						</Grid>

						<Flex mt="lg" className={ clsx(classes.bottomLinks) }>
							<Link href={ Routes.newUserPassword() }>Reset Password</Link>
							<Link href={ Routes.newUserRegistration() }>Register</Link>
						</Flex>

					</Form>
				</Paper>
			</Box>

			<Box id="auth-layout-right">
			</Box>
		</SimpleGrid>

	)
}

export default withLayout(Login, "auth")
