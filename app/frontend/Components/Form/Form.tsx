import React from 'react'
import { Box } from '@mantine/core'
import {
	Form as InertiaForm,
	type FormProps as UifFormProps,
	type NestedObject,
} from 'use-inertia-form'

import cx from 'clsx'
import * as classes from './Form.css'
import { isDevelopment } from '@/lib'

export interface FormProps<TForm> extends UifFormProps<TForm> {
	disableFormatting?: boolean
	grid?: boolean
}

const Form = <TForm extends NestedObject>({
	children,
	data,
	railsAttributes = true,
	remember,
	...props
}: FormProps<TForm>) => {
	return (
		<Box className={ cx(classes.form) }>
			<InertiaForm
				data={ data }
				railsAttributes={ railsAttributes }
				remember={ remember === undefined && isDevelopment() ? false : remember }
				{ ...props }
			>
				{ children }
			</InertiaForm>
		</Box>
	)
}

export default Form
