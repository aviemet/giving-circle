import clsx from "clsx"
import { useTranslation } from "react-i18next"

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
	const { t } = useTranslation()

	return (
		<SimpleGrid cols={ { sm: 1, md: 2 } } spacing={ 0 } className={ clsx(classes.authLayout) }>
			<Box id="auth-layout-left">
				<Paper shadow="lg" radius="lg" p="xl" withBorder>

					<Box mb="md">
						<Title>{ t("devise.ui.app_name") }</Title>
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
									placeholder={ t("devise.ui.email") }
									autoComplete="Email"
									required
									pattern=".+@.+\..+"
									disableAutofill={ false }
								/>
							</Grid.Col>

							<Grid.Col>
								<PasswordInput
									name="user.password"
									placeholder={ t("devise.ui.password") }
									autoComplete="current-password"
									required
								/>
							</Grid.Col>

							<Grid.Col>
								<Submit>{ t("devise.ui.log_in") }</Submit>
							</Grid.Col>

							<Grid.Col>
								<Checkbox name="user.remember_me" label={ t("devise.ui.remember_me") } />
							</Grid.Col>

						</Grid>

						<Flex mt="lg" className={ clsx(classes.bottomLinks) }>
							<Link href={ Routes.newUserPassword() }>{ t("devise.ui.reset_password") }</Link>
							<Link href={ Routes.newUserRegistration() }>{ t("devise.ui.register") }</Link>
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
