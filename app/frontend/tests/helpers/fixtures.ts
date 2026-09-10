import { defaultTextFontValue } from "@/components/VisualEditor/fields/font/textFont"
import { defaultLeverageBarSize } from "@/components/VisualEditor/fields/leverageBarSize/leverageBarSize"
import { defaultLeverageColors } from "@/components/VisualEditor/fields/leverageColors/leverageColors"
import { defaultTimerColors } from "@/components/VisualEditor/fields/timerColors/timerColors"
import { defaultTimerDuration } from "@/components/VisualEditor/fields/timerDuration/timerDuration"
import { defaultTimerExhausted } from "@/components/VisualEditor/fields/timerExhausted/timerExhausted"
import { type SlideData } from "@/types/SlideData"

export function createCirclePersisted(overrides?: Partial<Schema.CirclesPersisted>): Schema.CirclesPersisted {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		...overrides,
	}
}

export function createCirclesOptions(overrides?: Partial<Schema.CirclesOptions>): Schema.CirclesOptions {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		...overrides,
	}
}

export function createThemePersisted(overrides?: Partial<Schema.ThemesPersisted>): Schema.ThemesPersisted {
	return {
		id: "theme-1",
		name: "Theme 1",
		heading: "Theme Heading",
		description: "Theme description for tests",
		slug: "theme-1",
		status: "current",
		circle: createCirclesOptions(),
		...overrides,
	}
}

export function createThemeInertiaShare(overrides?: Partial<Schema.ThemesInertiaShare>): Schema.ThemesInertiaShare {
	return {
		id: "theme-1",
		name: "Theme 1",
		heading: "Theme Heading",
		description: "Theme description for tests",
		slug: "theme-1",
		status: "current",
		circle: createCirclesOptions(),
		...overrides,
	}
}

export function createCircleInertiaShare(overrides?: Partial<Schema.CirclesInertiaShare>): Schema.CirclesInertiaShare {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		settings: {
			primary_color: "blue",
		},
		themes: [createThemeInertiaShare()],
		...overrides,
	}
}

export function createRole(overrides?: Partial<Schema.Role>): Schema.Role {
	return {
		created_at: "2025-01-01T00:00:00.000Z",
		updated_at: "2025-01-01T00:00:00.000Z",
		users: [],
		...overrides,
	}
}

export function createMembershipPersisted(overrides?: Partial<Schema.MembershipsPersisted>): Schema.MembershipsPersisted {
	return {
		id: "membership-1",
		active: true,
		funds: { amount: 10, cents: 1000, currency_iso: "USD" },
		name: "Member 1",
		slug: "membership-1",
		number: "1",
		...overrides,
	}
}

export function createCircleShow(overrides?: Partial<Schema.CirclesShow>): Schema.CirclesShow {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		themes: [createThemePersisted()],
		memberships: [createMembershipPersisted()],
		...overrides,
	}
}

export function createOrgPersisted(overrides?: Partial<Schema.OrgsPersisted>): Schema.OrgsPersisted {
	return {
		id: "org-1",
		name: "Org 1",
		slug: "org-1",
		...overrides,
	}
}

export function createPresentationOrgPersisted(
	overrides?: Partial<Schema.PresentationsOrgsPersisted>,
): Schema.PresentationsOrgsPersisted {
	return {
		id: "org-1",
		name: "Org 1",
		slug: "org-1",
		ask: {
			amount: 1000,
			cents: 100_000,
			currency_iso: "USD",
		},
		...overrides,
	}
}

export function createCircleMock(overrides?: Partial<Schema.CirclesMock>): Schema.CirclesMock {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		finalist_count: 5,
		themes: [createThemePersisted()],
		orgs: [createOrgPersisted()],
		memberships: [createMembershipPersisted()],
		...overrides,
	}
}

export function createLeverageBarPuckNode(elementId: string) {
	return {
		type: "LeverageBar" as const,
		props: {
			id: elementId,
			currencyFormat: "compact" as const,
			size: defaultLeverageBarSize(),
			colors: defaultLeverageColors,
			font: defaultTextFontValue({
				color: "#FFFFFF",
				sizePreset: "xl",
			}),
		},
	}
}

export function createTimerPuckNode(elementId: string, displayType: "circle" | "digital" | "flip" | "sevenSegment" = "circle") {
	return {
		type: "Timer" as const,
		props: {
			id: elementId,
			displayType,
			duration: defaultTimerDuration(),
			colors: defaultTimerColors(),
			exhausted: defaultTimerExhausted(),
			font: defaultTextFontValue({
				color: "#FFFFFF",
				sizePreset: "4xl",
			}),
		},
	}
}

export function createSlideData(overrides?: Partial<SlideData>): SlideData {
	return {
		content: [],
		root: {
			props: {
				title: "Slide",
			},
		},
		...overrides,
	}
}

export function createSlidePresentation(overrides?: Partial<Schema.SlidesPresentation>): Schema.SlidesPresentation {
	return {
		id: "slide-1",
		slug: "slide-1",
		title: "Slide 1",
		data: createSlideData(),
		...overrides,
	}
}

export function createPresentationPresentation(overrides?: Partial<Schema.PresentationsPresentation>): Schema.PresentationsPresentation {
	return {
		id: "presentation-1",
		active: true,
		name: "Presentation 1",
		slug: "presentation-1",
		theme_id: "theme-1",
		settings: {
			finalist_count: 5,
		},
		orgs: [createPresentationOrgPersisted()],
		slides: [createSlidePresentation()],
		active_slide_id: "slide-1",
		element_controls: {},
		...overrides,
	}
}

export function createTemplatePersisted(overrides?: Partial<Schema.TemplatesPersisted>): Schema.TemplatesPersisted {
	return {
		id: "template-1",
		slug: "template-1",
		name: "Template 1",
		settings: {},
		circle: createCirclePersisted(),
		...overrides,
	}
}

export function createPresentationElementPersisted(overrides?: Partial<Schema.PresentationElementsPersisted>): Schema.PresentationElementsPersisted {
	return {
		id: "element-1",
		name: "Element 1",
		slug: "element-1",
		template: false,
		data: {},
		...overrides,
	}
}

export function createUserPersisted(overrides?: Partial<Schema.UsersPersisted>): Schema.UsersPersisted {
	return {
		id: "user-1",
		active: true,
		email: "user@example.com",
		slug: "user-1",
		person_id: undefined,
		...overrides,
	}
}

export function createPagination(overrides?: Partial<Schema.Pagination>): Schema.Pagination {
	return {
		count: 0,
		pages: 1,
		limit: 25,
		current_page: 1,
		next_page: 1,
		prev_page: 1,
		is_first_page: true,
		is_last_page: true,
		...overrides,
	}
}

export function createMembershipsIndex(overrides?: Partial<Schema.MembershipsIndex>): Schema.MembershipsIndex {
	return {
		id: "membership-1",
		active: true,
		funds: { amount: 0, cents: 0, currency_iso: "USD" },
		name: "Member 1",
		slug: "membership-1",
		person: {
			id: "person-1",
			active: true,
			name: "Person One",
			slug: "person-1",
		},
		...overrides,
	}
}

export function createOrgsIndex(overrides?: Partial<Schema.OrgsIndex>): Schema.OrgsIndex {
	return {
		id: "org-1",
		name: "Org 1",
		slug: "org-1",
		...overrides,
	}
}

export function createPresentationInertiaShare(
	overrides?: Partial<Schema.PresentationsInertiaShare>,
): Schema.PresentationsInertiaShare {
	return {
		id: "presentation-1",
		active: false,
		name: "Presentation 1",
		settings: {
			finalist_count: 5,
		},
		slug: "presentation-1",
		theme_id: "theme-1",
		...overrides,
	}
}

export function createPresentationsShow(overrides?: Partial<Schema.PresentationsShow>): Schema.PresentationsShow {
	return {
		id: "presentation-1",
		active: false,
		name: "Presentation 1",
		settings: {
			finalist_count: 5,
		},
		slug: "presentation-1",
		theme_id: "theme-1",
		template_id: "",
		slides: [],
		slides_count: 0,
		element_controls: {},
		...overrides,
	}
}

export function createThemesShow(overrides?: Partial<Schema.ThemesShow>): Schema.ThemesShow {
	return {
		id: "theme-1",
		name: "Theme 1",
		heading: "Theme Heading",
		description: "Theme description for tests",
		slug: "theme-1",
		status: "current",
		circle: createCirclePersisted(),
		orgs: [],
		orgs_count: 0,
		presentations: [],
		presentations_count: 0,
		total_ask_cents: 0,
		total_ask_currency: "USD",
		...overrides,
	}
}

export function createTemplatesIndex(overrides?: Partial<Schema.TemplatesIndex>): Schema.TemplatesIndex {
	return {
		id: "template-1",
		circle: createCirclesOptions(),
		name: "Template 1",
		settings: {},
		slug: "template-1",
		...overrides,
	}
}

export function createPresentationsIndex(overrides?: Partial<Schema.PresentationsIndex>): Schema.PresentationsIndex {
	return {
		id: "presentation-1",
		active: true,
		name: "Presentation 1",
		settings: {
			finalist_count: 5,
		},
		slug: "presentation-1",
		theme_id: "theme-1",
		theme: createThemesShow(),
		...overrides,
	}
}

export function createTemplatesShow(overrides?: Partial<Schema.TemplatesShow>): Schema.TemplatesShow {
	return {
		...createTemplatePersisted(),
		slides: [],
		...overrides,
	}
}

export function createSlidesIndex(overrides?: Partial<Schema.SlidesIndex>): Schema.SlidesIndex {
	return {
		id: "slide-1",
		slug: "slide-1",
		data: createSlideData(),
		title: "Slide 1",
		...overrides,
	}
}

export function createPresentationsFormData(overrides?: Partial<Schema.PresentationsFormData>): Schema.PresentationsFormData {
	return {
		active: true,
		name: "Presentation 1",
		settings: {
			finalist_count: 5,
		},
		slides: [],
		theme_id: "theme-1",
		template_id: "",
		id: "presentation-1",
		...overrides,
	}
}

export function createPresentationsEdit(overrides?: Partial<Schema.PresentationsEdit>): Schema.PresentationsEdit {
	const slide = createSlidePresentation()
	const slideEdit: Schema.SlidesEdit = {
		id: slide.id,
		slug: slide.slug,
		data: slide.data,
		title: slide.title,
	}
	return {
		id: "presentation-1",
		active: true,
		name: "Presentation 1",
		settings: {
			finalist_count: 5,
		},
		slug: "presentation-1",
		theme_id: "theme-1",
		slides: [slideEdit],
		...overrides,
	}
}

export function createInteractionUiTemplate(
	overrides?: Partial<Schema.InteractionUiTemplatesPersisted>,
): Schema.InteractionUiTemplatesPersisted {
	return {
		id: "ui-1",
		name: "Allocation",
		slug: "allocation",
		...overrides,
	}
}

export function createInteractionConfigTemplatePersisted(
	overrides?: Partial<Schema.InteractionConfigTemplatesPersisted>,
): Schema.InteractionConfigTemplatesPersisted {
	return {
		id: "ict-1",
		name: "Allocation template",
		slug: "allocation-template",
		config: {},
		member_ui: {},
		interaction_ui_template: createInteractionUiTemplate(),
		...overrides,
	}
}

export function createInteractionConfigTemplatesIndex(
	overrides?: Partial<Schema.InteractionConfigTemplatesIndex>,
): Schema.InteractionConfigTemplatesIndex {
	return {
		id: "ict-1",
		name: "Allocation template",
		slug: "allocation-template",
		config: {},
		member_ui: {},
		circle: createCirclePersisted(),
		interaction_ui_template: createInteractionUiTemplate(),
		...overrides,
	}
}

export function createInteractionConfigTemplatesFormData(
	overrides?: Partial<Schema.InteractionConfigTemplatesFormData>,
): Schema.InteractionConfigTemplatesFormData {
	const uiTemplate = createInteractionUiTemplate()
	return {
		name: "Allocation template",
		config: {},
		member_ui: {},
		field_types: ["text", "number", "money", "org_money_map", "org_reference", "single_select"],
		metrics: ["allocated_totals"],
		reducers: ["sum_by_org"],
		interaction_ui_template: uiTemplate,
		interaction_ui_templates: [uiTemplate],
		...overrides,
	}
}

export function createInteractionConfigTemplatesEdit(
	overrides?: Partial<Schema.InteractionConfigTemplatesEdit>,
): Schema.InteractionConfigTemplatesEdit {
	return {
		...createInteractionConfigTemplatesFormData(),
		id: "ict-1",
		slug: "allocation-template",
		...overrides,
	}
}

export function createPresentationInteractionsFormData(
	overrides?: Partial<Schema.PresentationInteractionsFormData>,
): Schema.PresentationInteractionsFormData {
	const uiTemplate = createInteractionUiTemplate()
	const configTemplate = createInteractionConfigTemplatePersisted({
		interaction_ui_template: uiTemplate,
	})
	return {
		accepting_responses: false,
		config: {},
		member_ui: {},
		field_types: ["text", "number", "money", "org_money_map", "org_reference", "single_select", "field_group"],
		interaction_config_templates: [configTemplate],
		interaction_ui_template: uiTemplate,
		interaction_ui_templates: [
			uiTemplate,
			createInteractionUiTemplate({ id: "ui-2", name: "Finalist vote", slug: "finalist_vote" }),
			createInteractionUiTemplate({ id: "ui-3", name: "Pledges", slug: "pledges" }),
		],
		metrics: ["allocated_totals", "org_vote_totals"],
		name: "Allocation Round",
		reducers: ["sum_by_org", "count"],
		results: {},
		slides: [createSlidePresentation()],
		trigger_conditions: {},
		trigger_type: "manual",
		finalist_count: 5,
		...overrides,
	}
}

export function createPresentationInteractionsIndex(
	overrides?: Partial<Schema.PresentationInteractionsIndex>,
): Schema.PresentationInteractionsIndex {
	return {
		id: "interaction-1",
		accepting_responses: true,
		config: {},
		member_ui: {},
		interaction_ui_template: createInteractionUiTemplate(),
		name: "Allocation Round",
		results: {},
		slug: "allocation-round",
		trigger_conditions: {},
		trigger_type: "manual",
		...overrides,
	}
}

export function createPresentationInteractionsShow(
	overrides?: Partial<Schema.PresentationInteractionsShow>,
): Schema.PresentationInteractionsShow {
	return {
		...createPresentationInteractionsIndex(),
		...overrides,
	}
}

export function createPresentationInteractionsEdit(
	overrides?: Partial<Schema.PresentationInteractionsEdit>,
): Schema.PresentationInteractionsEdit {
	return {
		...createPresentationInteractionsFormData(),
		id: "interaction-1",
		...overrides,
	}
}

export function createThemesIndex(overrides?: Partial<Schema.ThemesIndex>): Schema.ThemesIndex {
	return {
		id: "theme-1",
		circle: createCirclesOptions(),
		name: "Theme 1",
		slug: "theme-1",
		status: "current",
		...overrides,
	}
}

export function createTemplatesEdit(overrides?: Partial<Schema.TemplatesEdit>): Schema.TemplatesEdit {
	return {
		id: "template-1",
		circle: createCirclePersisted(),
		name: "Template 1",
		settings: {},
		slides: [],
		slug: "template-1",
		...overrides,
	}
}

export function createThemesFormData(overrides?: Partial<Schema.ThemesFormData>): Schema.ThemesFormData {
	return {
		name: "Theme 1",
		heading: "Theme Heading",
		description: "Theme description",
		status: "draft",
		...overrides,
	}
}

export function createThemesEdit(overrides?: Partial<Schema.ThemesEdit>): Schema.ThemesEdit {
	return {
		id: "theme-1",
		circle: createCirclesOptions(),
		name: "Theme 1",
		heading: "Theme Heading",
		description: "Theme description",
		slug: "theme-1",
		status: "current",
		...overrides,
	}
}

export function createThemesOrgsShow(overrides?: Partial<Schema.ThemesOrgsShow>): Schema.ThemesOrgsShow {
	return {
		id: "org-1",
		ask: { amount: 1000, cents: 100_000, currency_iso: "USD" },
		circle: createCirclePersisted(),
		description: "Org description",
		name: "Org 1",
		slug: "org-1",
		...overrides,
	}
}

export function createOrgsFormData(overrides?: Partial<Schema.OrgsFormData>): Schema.OrgsFormData {
	return {
		name: "Org 1",
		description: "Org description",
		...overrides,
	}
}

export function createOrgsEdit(overrides?: Partial<Schema.OrgsEdit>): Schema.OrgsEdit {
	return {
		id: "org-1",
		name: "Org 1",
		slug: "org-1",
		description: "Org description",
		...overrides,
	}
}

export function createUsersIndex(overrides?: Partial<Schema.UsersIndex>): Schema.UsersIndex {
	return {
		id: "user-1",
		active: true,
		circles: [createCirclePersisted()],
		created_at: "2025-01-01T00:00:00.000Z",
		email: "user@example.com",
		person: {
			id: "person-1",
			active: true,
			name: "Person One",
			slug: "person-1",
		},
		roles: [],
		slug: "user-1",
		table_preferences: {},
		updated_at: "2025-01-01T00:00:00.000Z",
		user_preferences: {},
		...overrides,
	}
}

export function createIntegrationsPersisted(
	overrides?: Partial<Schema.IntegrationsPersisted>,
): Schema.IntegrationsPersisted {
	return {
		id: "integration-1",
		active: true,
		credentials: {},
		medium: "email",
		name: "SMTP",
		provider: "smtp",
		...overrides,
	}
}

export function createPresentationMessagesIndex(
	overrides?: Partial<Schema.PresentationMessagesIndex>,
): Schema.PresentationMessagesIndex {
	return {
		id: "presentation-message-1",
		body: "Hello",
		delivery_results: {},
		medium: "email",
		name: "Welcome email",
		slug: "welcome-email",
		status: "ready",
		subject: "Welcome",
		...overrides,
	}
}

export function createMessageTemplatesPersisted(
	overrides?: Partial<Schema.MessageTemplatesPersisted>,
): Schema.MessageTemplatesPersisted {
	return {
		id: "message-template-1",
		body: "Hello #membership.name",
		medium: "email",
		name: "Welcome template",
		slug: "welcome-template",
		subject: "Welcome",
		...overrides,
	}
}

export function createMessageTemplatesFormData(
	overrides?: Partial<Schema.MessageTemplatesFormData>,
): Schema.MessageTemplatesFormData {
	return {
		name: "Welcome template",
		medium: "email",
		mediums: ["email", "sms"],
		body: "<p>Hello</p>",
		subject: "Hello",
		...overrides,
	}
}

export function createPresentationMessagesFormData(
	overrides?: Partial<Schema.PresentationMessagesFormData>,
): Schema.PresentationMessagesFormData {
	return {
		name: "Welcome email",
		medium: "email",
		mediums: ["email", "sms"],
		body: "<p>Hello</p>",
		subject: "Hello",
		status: "ready",
		delivery_results: {},
		integrations: [createIntegrationsPersisted()],
		interactions: [],
		message_templates: [],
		...overrides,
	}
}

export function createIntegrationsIndex(overrides?: Partial<Schema.IntegrationsIndex>): Schema.IntegrationsIndex {
	return {
		id: "integration-1",
		name: "Primary SMTP",
		provider: "smtp",
		medium: "email",
		active: true,
		credentials: {},
		...overrides,
	}
}

export function createIntegrationsFormData(overrides?: Partial<Schema.IntegrationsFormData>): Schema.IntegrationsFormData {
	return {
		name: "Primary SMTP",
		provider: "smtp",
		medium: "email",
		active: true,
		credentials: {
			host: "smtp.example.com",
			port: "587",
			username: "user@example.com",
			password: "secret",
		},
		providers: ["smtp", "mailerlite", "twilio", "plivo"],
		providers_by_medium: {
			email: ["smtp", "mailerlite"],
			sms: ["twilio", "plivo"],
		},
		credential_fields: {
			smtp: ["host", "port", "username", "password"],
			twilio: ["account_sid", "auth_token", "from_number"],
			plivo: ["auth_id", "auth_token", "from_number"],
			mailerlite: ["api_token", "from_email"],
		},
		presets: {
			smtp: {
				medium: "email",
				auth_profile: "smtp",
				fields: [
					{ key: "host", secret: false },
					{ key: "port", secret: false },
					{ key: "username", secret: false },
					{ key: "password", secret: true },
				],
			},
			mailerlite: {
				medium: "email",
				auth_profile: "api_token",
				fields: [
					{ key: "api_token", secret: true },
					{ key: "from_email", secret: false },
				],
			},
			twilio: {
				medium: "sms",
				auth_profile: "basic_auth",
				fields: [
					{ key: "account_sid", secret: false },
					{ key: "auth_token", secret: true },
					{ key: "from_number", secret: false },
				],
			},
			plivo: {
				medium: "sms",
				auth_profile: "basic_auth",
				fields: [
					{ key: "auth_id", secret: false },
					{ key: "auth_token", secret: true },
					{ key: "from_number", secret: false },
				],
			},
		},
		...overrides,
	}
}

export function createAllocationMemberUi(): Record<string, unknown> {
	return {
		content: [
			{
				type: "InteractionOrgMoneyMap",
				props: {
					id: "interaction-allocations",
					fieldKey: "allocations",
					label: "Allocate to organizations",
					outputMetric: "allocated_totals",
					widget: "cards",
				},
			},
		],
		root: {
			props: {
				title: "Allocation",
			},
		},
	}
}

export function createFinalistVoteMemberUi(): Record<string, unknown> {
	return {
		content: [
			{
				type: "InteractionOrgMoneyMap",
				props: {
					id: "interaction-votes",
					fieldKey: "votes",
					label: "Cast your votes for organizations",
					outputMetric: "org_vote_totals",
					widget: "cards",
				},
			},
		],
		root: {
			props: {
				title: "Finalist vote",
			},
		},
	}
}

export function createPledgesMemberUi(): Record<string, unknown> {
	return {
		content: [
			{
				type: "InteractionOrgMoneyMap",
				props: {
					id: "interaction-pledges",
					fieldKey: "pledges",
					label: "Pledge to organizations",
					outputMetric: "pledge_totals",
					widget: "cards",
				},
			},
			{
				type: "InteractionBooleanInput",
				props: {
					id: "interaction-anonymous",
					fieldKey: "anonymous",
					label: "Anonymous",
				},
			},
		],
		root: {
			props: {
				title: "Pledges",
			},
		},
	}
}
