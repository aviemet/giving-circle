import React from 'react'
import { Form,TextInput, PasswordInput, Checkbox, Submit } from '@/Components/Form'
import { Title, Link,Box, Paper, SimpleGrid, Grid, Flex } from '@/Components'
import { Routes } from '@/lib'
import { type UseFormProps } from 'use-inertia-form'

import cx from 'clsx'
import * as classes from './Login.css'

type LoginFormData = {
	user: {
		email: string
		password: string
		remember_me: boolean
	}
}

const defaultData = {
	user: {
		email: '',
		password: '',
		remember_me: false,
	},
}

// @path: /login
// @route: newUserSession
const Login = () => {

	const handleSubmit = ({ data }: UseFormProps<LoginFormData>) => {
		if(data.user.email === '' || data.user.password === '') {
			return false
		}
	}

	return (
		<SimpleGrid cols={ { sm: 1, md: 2 } } spacing={ 0 } className={ cx(classes.authLayout) }>
			<Box id="auth-layout-left">
				<Paper shadow="lg" radius="lg" p="xl"  withBorder>

					<Box mb="md">
						<Title>Giving Circle</Title>
					</Box>

					<Form
						model="user"
						data={ defaultData }
						to={ Routes.newUserSession() }
						onSubmit={ handleSubmit }
					>
						<Grid>

							<Grid.Col>
								<TextInput
									name="email"
									placeholder="Email"
									autoComplete="Email"
									required
									pattern=".+@.+\..+"
								/>
							</Grid.Col>

							<Grid.Col>
								<PasswordInput
									name="password"
									placeholder="Password"
									autoComplete="current-password"
									required
								/>
							</Grid.Col>

							<Grid.Col>
								<Submit>Log In</Submit>
							</Grid.Col>

							<Grid.Col>
								<Checkbox name="remember_me" label="Remember Me" />
							</Grid.Col>

						</Grid>

						<Flex mt="lg" className={ cx(classes.bottomLinks) }>
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

export default Login
