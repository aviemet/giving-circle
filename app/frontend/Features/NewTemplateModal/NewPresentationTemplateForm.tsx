import React from 'react'
import { Grid, Text } from '@/Components'
import { Checkbox, DynamicInputs, Form, NumberInput, Radio, Submit, Switch, TextInput } from '@/Components/Form'
import { Routes } from '@/lib'
import { useForm } from 'use-inertia-form'

export type NewTemplateFormData = {
	presentation_template: {
		orgs_vote_round: boolean
		num_top_orgs: number
		allocation_vote_round: boolean
	}
}

interface NewPresentationTemplateFormProps {}

const NewPresentationTemplateForm = ({}: NewPresentationTemplateFormProps) => {
	const { getData } = useForm<NewTemplateFormData>()

	return (
		<Grid>
			<Grid.Col>
				<TextInput label="Name" name="name" />
			</Grid.Col>
			{ /*
			<Grid.Col>
				<Text>Set some defaults below. Theses can all be edited when the template is used to generate a presentation for a Theme</Text>
			</Grid.Col>

			<Grid.Col>
				<Switch
					label="Will members be voting for which of a subset of organizations get funded?"
					name="orgs_vote_round"
				/>
			</Grid.Col>

			{ getData('presentation_template.orgs_vote_round') && <Grid.Col>
				<NumberInput label="How many orgs in the final round?" name="num_top_orgs" />
			</Grid.Col> }

			<Grid.Col>
				<Switch
					label="Will members be choosing how to allocate their money to organizations?"
					name="allocation_vote_round"
				/>
			</Grid.Col>

			<Grid.Col>
				<Radio.Group
					label="How will you allocate un-voted funds?"
					name="distribution_strategy"
				>
					<Radio value="waterfall" label="Waterfall" />
					<Radio value="percentage" label="By percentage of voted funds" />
				</Radio.Group>
			</Grid.Col> */ }

			<Grid.Col>
				<Submit>Let&apos;s Get Started!</Submit>
			</Grid.Col>

		</Grid>
	)
}

export default NewPresentationTemplateForm




/**
 * what are presentation settings values?
 *
 * rounds:
 * 	voting types:
 * 		counted votes:
 * 			goal post
 * 			ranked choice
 * 			chits
 *
 * 		money votes:
 * 			allocate your money
 *
 * 		pledges:
 * 			donate extra money
 *
 * how many orgs will get funded
 * will there be a consolation for the others
 *
 */
