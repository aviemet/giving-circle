import { Avatar, ButtonProps, HoverCard, Text, useMantineTheme } from "@mantine/core"
import { useMachine } from "@xstate/react"
import axios from "axios"
import React, { useMemo, useState } from "react"
import { setup, assign } from "xstate"

import { Button, Group } from "@/components"
import { CheckIcon, CircleDotIcon, CrossIcon } from "@/components/Icons"
import { HTTPVerb } from "@/lib/http"


type StateMachineContext = {
	icon: React.ReactNode
	color: string
}

type StateMachineEvents =
	| { type: "requesting" }
	| { type: "success" }
	| { type: "error" }

interface TestResponseButtonProps extends ButtonProps {
	children?: string
	endpoint: string
	method?: HTTPVerb
	data?: unknown
}

/**
 * Generic component for testing the response from a remote endpoint
 * Displays success if the endpoint returns a successful response, error upon any errors *
 */
export function TestResponseButton({ children = "Test", endpoint, method = "get", data, ...props }: TestResponseButtonProps) {
	const theme = useMantineTheme()

	const [errorMessage, setErrorMessage] = useState("")

	const testMachine = useMemo(() => {
		return setup({
			types: {
				context: {} as StateMachineContext,
				events: {} as StateMachineEvents,
			},
		}).createMachine({
			id: "testResponse",
			initial: "inactive",
			context: {
				icon: <></>,
				color: theme.primaryColor,
			},
			states: {
				inactive: {
					on: {
						requesting: {
							target: "requesting",
							actions: assign({
								icon: () => <></>,
								color: () => theme.primaryColor,
							}),
						},
					},
				},
				requesting: {
					entry: assign({
						icon: () => <></>,
						color: () => theme.primaryColor,
					}),
					on: {
						success: "success",
						error: "error",
					},
				},
				error: {
					entry: assign({
						icon: () => <CrossIcon />,
						color: () => "red",
					}),
					on: {
						requesting: "requesting",
					},
				},
				success: {
					entry: assign({
						icon: () => <CheckIcon />,
						color: () => "green",
					}),
					on: {
						requesting: "requesting",
					},
				},
			},
		})
	}, [theme.primaryColor])

	const [state, send] = useMachine(testMachine)

	const handleClick = () => {
		setErrorMessage("")
		send({ type: "requesting" })
		axios.request({
			method,
			url: endpoint,
			data,
		})
			.then(response => {
				if(response.data.success) {
					setErrorMessage("")
					send({ type: "success" })
				} else {
					setErrorMessage(response.data.message)
					send({ type: "error" })
				}
			})
			.catch(reason => {
				setErrorMessage(reason)
				send({ type: "error" })
			})
	}

	const context = state.context

	return (
		<Group>
			{ state.value === "error" &&
				<HoverCard>
					<HoverCard.Target>
						<Avatar><CircleDotIcon /></Avatar>
					</HoverCard.Target>
					<HoverCard.Dropdown>
						<Text size="md" fw={ 700 }>Authentication Failed</Text>
						<Text>{ errorMessage }</Text>
					</HoverCard.Dropdown>
				</HoverCard>
			}
			<Button
				onClick={ handleClick }
				leftSection={ context.icon }
				color={ context.color }
				loading={ state.value === "requesting" }
				{ ...props }
			>
				{ children }
			</Button>
		</Group>
	)
}
