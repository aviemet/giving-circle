import { Flash } from "@/components"

import BareAppLayout from "./AppLayout"
import BareAuthLayout from "./AuthLayout"
import BarePresentationLayout from "./PresentationLayout"
import Providers from "./Providers"
import BarePublicLayout from "./PublicLayout"
import BareSettingsLayout from "./SettingsLayout"

import "@/lib/i18n"

export const LAYOUTS = {
	"auth": "auth",
	"app": "app",
	"settings": "settings",
	"public": "public",
	"presentation": "presentation",
} as const

export interface LayoutProps {
	children: any
}

export const LayoutWrapper = ({ children }: LayoutProps) => {
	return (
		<Providers>
			<Flash />
			{ children }
		</Providers>
	)
}

export const AuthLayout = ({ children }: LayoutProps) => {
	return (
		<LayoutWrapper>
			<BareAuthLayout>
				{ children }
			</BareAuthLayout>
		</LayoutWrapper>
	)
}

export const AppLayout = ({ children }: LayoutProps) => {
	return (
		<LayoutWrapper>
			<BareAppLayout>
				{ children }
			</BareAppLayout>
		</LayoutWrapper>
	)
}

export const PresentationLayout = ({ children }: LayoutProps) => {
	return (
		<LayoutWrapper>
			<BarePresentationLayout>
				{ children }
			</BarePresentationLayout>
		</LayoutWrapper>
	)
}

export const SettingsLayout = ({ children }: LayoutProps) => {
	return (
		<LayoutWrapper>
			<BareSettingsLayout>
				{ children }
			</BareSettingsLayout>
		</LayoutWrapper>
	)
}

export const PublicLayout = ({ children }: LayoutProps) => {
	return (
		<LayoutWrapper>
			<BarePublicLayout>
				{ children }
			</BarePublicLayout>
		</LayoutWrapper>
	)
}
