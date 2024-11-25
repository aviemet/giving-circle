/**
 * File generated by js-routes RubyVariables.GEM_VERSION
 * Based on Rails RubyVariables.RAILS_VERSION routes of RubyVariables.APP_CLASS
 */
declare type Optional<T> = {
    [P in keyof T]?: T[P] | null;
};
declare type Collection<T> = Record<string, T>;
declare type BaseRouteParameter = string | boolean | Date | number;
declare type MethodRouteParameter = BaseRouteParameter | (() => BaseRouteParameter);
declare type ModelRouteParameter = {
    id: MethodRouteParameter;
} | {
    to_param: MethodRouteParameter;
} | {
    toParam: MethodRouteParameter;
};
declare type RequiredRouteParameter = BaseRouteParameter | ModelRouteParameter;
declare type OptionalRouteParameter = undefined | null | RequiredRouteParameter;
declare type QueryRouteParameter = OptionalRouteParameter | QueryRouteParameter[] | {
    [k: string]: QueryRouteParameter;
};
declare type RouteParameters = Collection<QueryRouteParameter>;
declare type Serializable = Collection<unknown>;
declare type Serializer = (value: Serializable) => string;
declare type RouteHelperExtras = {
    requiredParams(): string[];
    toString(): string;
};
declare type RequiredParameters<T extends number> = T extends 1 ? [RequiredRouteParameter] : T extends 2 ? [RequiredRouteParameter, RequiredRouteParameter] : T extends 3 ? [RequiredRouteParameter, RequiredRouteParameter, RequiredRouteParameter] : T extends 4 ? [
    RequiredRouteParameter,
    RequiredRouteParameter,
    RequiredRouteParameter,
    RequiredRouteParameter
] : RequiredRouteParameter[];
declare type RouteHelperOptions = RouteOptions & Collection<OptionalRouteParameter>;
declare type RouteHelper<T extends number = number> = ((...args: [...RequiredParameters<T>, RouteHelperOptions]) => string) & RouteHelperExtras;
declare type RouteHelpers = Collection<RouteHelper>;
declare type Configuration = {
    prefix: string;
    default_url_options: RouteParameters;
    special_options_key: string;
    serializer: Serializer;
};
interface RouterExposedMethods {
    config(): Configuration;
    configure(arg: Partial<Configuration>): Configuration;
    serialize: Serializer;
}
declare type KeywordUrlOptions = Optional<{
    host: string;
    protocol: string;
    subdomain: string;
    port: string | number;
    anchor: string;
    trailing_slash: boolean;
    params: RouteParameters;
}>;
declare type RouteOptions = KeywordUrlOptions & RouteParameters;
declare type PartsTable = Collection<{
    r?: boolean;
    d?: OptionalRouteParameter;
}>;
declare type ModuleType = "CJS" | "AMD" | "UMD" | "ESM" | "DTS" | "NIL";
declare const RubyVariables: {
    PREFIX: string;
    DEPRECATED_GLOBBING_BEHAVIOR: boolean;
    DEPRECATED_FALSE_PARAMETER_BEHAVIOR: boolean;
    SPECIAL_OPTIONS_KEY: string;
    DEFAULT_URL_OPTIONS: RouteParameters;
    SERIALIZER: Serializer;
    ROUTES_OBJECT: RouteHelpers;
    MODULE_TYPE: ModuleType;
    WRAPPER: <T>(callback: T) => T;
};
declare const define: undefined | (((arg: unknown[], callback: () => unknown) => void) & {
    amd?: unknown;
});
declare const module: {
    exports: unknown;
} | undefined;
export const configure: RouterExposedMethods['configure'];

export const config: RouterExposedMethods['config'];

export const serialize: RouterExposedMethods['serialize'];

/**
 * Generates rails route to
 * /:circle_slug/about(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const aboutCircle: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /presentations/:presentation_slug/settings(.:format)
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const activePresentationSettings: ((
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /presentations/:presentation_slug/show(.:format)
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const activePresentationShow: ((
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /api/searches(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const apiSearches: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /api/spotlights(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const apiSpotlights: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /api/users/:id/update_table_preferences(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const apiUpdateTablePreferences: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /api/users/:id/update_user_preferences(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const apiUpdateUserPreferences: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /api/users/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const apiUser: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /api/users(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const apiUsers: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/cancel(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const cancelUserRegistration: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const circle: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/memberships(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const circleMemberships: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/orgs(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const circleOrgs: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const circleThemes: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const circles: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /logout(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const destroyUserSession: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/edit(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editCircle: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/memberships/:slug/edit(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editMembership: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/orgs/:slug/edit(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editOrg: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /people/:slug/edit(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editPerson: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:slug/edit(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editTheme: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/memberships/:slug/edit(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editThemeMembership: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/orgs/:slug/edit(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editThemeOrg: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:slug/edit(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editThemePresentation: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id/edit(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editThemePresentationDistribution: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:id/edit(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editThemePresentationElement: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:id/edit(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editThemePresentationSlide: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes/:id/edit(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editThemePresentationVote: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editUser: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/password/edit(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editUserPassword: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/edit(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editUserRegistration: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const home: ((
  options?: RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/memberships/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const membership: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newCircle: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/memberships/new(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newCircleMembership: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/orgs/new(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newCircleOrg: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/new(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newCircleTheme: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /people/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newPerson: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/memberships/new(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemeMembership: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/orgs/new(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemeOrg: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/new(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemePresentation: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/new(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemePresentationDistribution: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/new(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemePresentationElement: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/new(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemePresentationSlide: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes/new(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemePresentationVote: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newUser: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/confirmation/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newUserConfirmation: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/password/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newUserPassword: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/register(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newUserRegistration: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /login(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newUserSession: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/unlock/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newUserUnlock: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/orgs/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const org: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/orgs/:org_slug/about(.:format)
 * @param {any} circleSlug
 * @param {any} orgSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const orgAbout: ((
  circleSlug: RequiredRouteParameter,
  orgSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /orgs(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const orgs: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /people(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const people: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /people/:slug(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const person: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const root: ((
  options?: RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /settings(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settings: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /settings/appearance(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsAppearance: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /settings/general(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsGeneral: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /settings/integrations(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsIntegrations: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /settings/localizations(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsLocalizations: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /settings/notifications(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsNotifications: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const theme: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/about(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeAbout: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/memberships/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeMembership: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/memberships(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeMemberships: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/orgs/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeOrg: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/orgs(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeOrgIndex: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/orgs(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeOrgs: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/orgs/import(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeOrgsImport: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentation: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/active(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationActive: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationDistribution: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationDistributions: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:id(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationElement: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationElements: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:id(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationSlide: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationSlides: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes/:id(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationVote: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/votes(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {any} presentationSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentationVotes: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  presentationSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /:circle_slug/themes/:theme_slug/presentations(.:format)
 * @param {any} circleSlug
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentations: ((
  circleSlug: RequiredRouteParameter,
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /rails/active_storage/disk/:encoded_token(.:format)
 * @param {any} encodedToken
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const updateRailsDiskService: ((
  encodedToken: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const user: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/confirmation(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const userConfirmation: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/password(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const userPassword: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const userRegistration: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /login(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const userSession: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users/unlock(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const userUnlock: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /users(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const users: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

// By some reason this line prevents all types in a file
// from being automatically exported
export {};
