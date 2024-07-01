import React from 'react'
import { Box } from '@mantine/core'
import { createContext } from '@/lib/hooks'
import {
	Form as InertiaForm,
	type FormProps as UifFormProps,
	type NestedObject,
} from 'use-inertia-form'

import cx from 'clsx'
import * as classes from './Form.css'

type FormLayoutValues = {
	disableFormatting: boolean
}

const [useFormFormat, FormFormatProvider] = createContext<FormLayoutValues>()
export { useFormFormat }

export interface FormProps<TForm> extends UifFormProps<TForm> {
	disableFormatting?: boolean
	grid?: boolean
}

const Form = <TForm extends NestedObject>({
	children,
	data,
	disableFormatting = false,
	railsAttributes = true,
	...props
}: FormProps<TForm>) => {
	return (
		<FormFormatProvider value={ { disableFormatting } }>
			<Box className={ cx(classes.form) }>
				<InertiaForm
					data={ data }
					railsAttributes={ railsAttributes }
					{ ...props }
				>
					{ children }
				</InertiaForm>
			</Box>
		</FormFormatProvider>
	)
}

export default Form
