import { AppLayout as BareAppLayout } from "./AppLayout"
import { AuthLayout as BareAuthLayout } from "./AuthLayout"
import { PresentationLayout as BarePresentationLayout } from "./PresentationLayout"
import { Providers } from "./Providers"
import { PublicLayout as BarePublicLayout } from "./PublicLayout"
import { PublicPresentationLayout as BarePublicPresentationLayout } from "./PublicPresentationLayout"
import { SettingsLayout as BareSettingsLayout } from "./SettingsLayout"
import { UnformattedLayout as BareUnformattedLayout } from "./UnformattedLayout"

import "@/lib/i18n"

export const LAYOUTS = {
	"auth": "auth",
	"app": "app",
	"settings": "settings",
	"public": "public",
	"presentation": "presentation",
	"publicPresentation": "publicPresentation",
	"unformatted": "unformatted",
} as const

export interface LayoutProps {
	children: any
}

export const LayoutWrapper = ({ children }: LayoutProps) => {
	return (
		<Providers>
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

export const PublicPresentationLayout = ({ children }: LayoutProps) => {
	return (
		<LayoutWrapper>
			<BarePublicPresentationLayout>
				{ children }
			</BarePublicPresentationLayout>
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

export const UnformattedLayout = ({ children }: LayoutProps) => {
	return (
		<LayoutWrapper>
			<BareUnformattedLayout>
				{ children }
			</BareUnformattedLayout>
		</LayoutWrapper>
	)
}
