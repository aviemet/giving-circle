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

export function createCircleMock(overrides?: Partial<Schema.CirclesMock>): Schema.CirclesMock {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		themes: [createThemePersisted()],
		orgs: [createOrgPersisted()],
		memberships: [createMembershipPersisted()],
		...overrides,
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
		orgs: [createOrgPersisted()],
		slides: [createSlidePresentation()],
		active_slide_id: "slide-1",
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
		slug: "presentation-1",
		theme_id: "theme-1",
		template_id: "",
		slides: [],
		slides_count: 0,
		...overrides,
	}
}

export function createThemesShow(overrides?: Partial<Schema.ThemesShow>): Schema.ThemesShow {
	return {
		id: "theme-1",
		name: "Theme 1",
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
		slug: "presentation-1",
		theme_id: "theme-1",
		slides: [slideEdit],
		...overrides,
	}
}

