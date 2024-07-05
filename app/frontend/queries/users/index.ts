import { Routes } from '@/lib'
import axios from 'axios'
import { UserPreferences, UserTablePreferences } from '@/types'
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { type ReactMutationFunction } from '..'

type UserPreferencesParams = {
	id: string | number
	preferences: UserPreferences
}

export const useUpdateUserPreferences: ReactMutationFunction<Schema.User, UserPreferencesParams> = (
	params,
	options,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, preferences }) => {
			const res = await axios.patch(Routes.apiUpdateUserPreferences(id), {
				user: { user_preferences: preferences },
			})
			if(res.statusText !== 'OK') {
				throw new Error('Failed to update user preferences')
			}
			return res.data
		},
		mutationKey: ['user', params.id, 'user_preferences'],
		...options,
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['user', params.id, 'user_preferences'] })
			options?.onSuccess?.(data, variables)
		},
	})
}

type TablePreferencesParams = {
	id: string | number
	preferences: UserTablePreferences
}

export const useUpdateTablePreferences: ReactMutationFunction<Schema.User, TablePreferencesParams> = (
	params,
	options,
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ id, preferences }) => {
			const res = await axios.patch(Routes.apiUpdateTablePreferences(id), {
				user: { table_preferences: preferences },
			})
			if(res.statusText !== 'OK') {
				throw new Error('Failed to update user table preferences')
			}
			return res.data
		},
		mutationKey: ['user', params.id, 'table_preferences'],
		...options,
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ['user', params.id, 'table_preferences'] })
			options?.onSuccess?.(data, variables)
		},
	})
}
