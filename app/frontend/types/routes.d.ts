/**
 * File generated by js-routes RubyVariables.GEM_VERSION
 * Based on Rails RubyVariables.RAILS_VERSION routes of RubyVariables.APP_CLASS
 */
declare type Optional<T> = {
    [P in keyof T]?: T[P] | null;
};
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
declare type RouteParameters = Record<string, QueryRouteParameter>;
declare type Serializable = Record<string, unknown>;
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
declare type RouteHelperOptions = RouteOptions & Record<string, OptionalRouteParameter>;
declare type RouteHelper<T extends number = number> = ((...args: [...RequiredParameters<T>, RouteHelperOptions]) => string) & RouteHelperExtras;
declare type RouteHelpers = Record<string, RouteHelper>;
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
declare type PartsTable = Record<string, {
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
    exports: any;
} | undefined;
export const configure: RouterExposedMethods['configure'];

export const config: RouterExposedMethods['config'];

export const serialize: RouterExposedMethods['serialize'];

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
 * /admin/circles/:slug(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const circle: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/circles/:circle_slug/members(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const circleMembers: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/circles/:circle_slug/themes(.:format)
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
 * /admin/circles(.:format)
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
 * /admin/circles/:slug/edit(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editCircle: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/members/:slug/edit(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editMember: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/orgs/:slug/edit(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editOrg: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/presentations/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editPresentation: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/themes/:slug/edit(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editTheme: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/users/:id/edit(.:format)
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
 * /admin(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const home: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/members/:slug(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const member: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/circles/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newCircle: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/circles/:circle_slug/members/new(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newCircleMember: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/circles/:circle_slug/themes/new(.:format)
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
 * /admin/themes/:theme_slug/members/new(.:format)
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemeMember: ((
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/themes/:theme_slug/orgs/new(.:format)
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemeOrg: ((
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/themes/:theme_slug/presentations/new(.:format)
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newThemePresentation: ((
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/users/new(.:format)
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
 * /admin/orgs/:slug(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const org: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/presentations/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const presentation: ((
  id: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles/:slug(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const publicCircle: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles/:circle_slug/orgs/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const publicCircleOrg: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles/:circle_slug/orgs(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const publicCircleOrgs: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles/:circle_slug/themes/:slug(.:format)
 * @param {any} circleSlug
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const publicCircleTheme: ((
  circleSlug: RequiredRouteParameter,
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles/:circle_slug/themes(.:format)
 * @param {any} circleSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const publicCircleThemes: ((
  circleSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /circles(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const publicCircles: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const root: ((
  options?: {} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/settings(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settings: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/settings/appearance(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsAppearance: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/settings/general(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsGeneral: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/settings/integrations(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsIntegrations: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/settings/localizations(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsLocalizations: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/settings/notifications(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const settingsNotifications: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/themes/:slug(.:format)
 * @param {any} slug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const theme: ((
  slug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/themes/:theme_slug/members(.:format)
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeMembers: ((
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/themes/:theme_slug/orgs(.:format)
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themeOrgs: ((
  themeSlug: RequiredRouteParameter,
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

/**
 * Generates rails route to
 * /admin/themes/:theme_slug/presentations(.:format)
 * @param {any} themeSlug
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const themePresentations: ((
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
 * /admin/users/:id(.:format)
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
 * /admin/users(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const users: ((
  options?: {format?: OptionalRouteParameter} & RouteOptions
) => string) & RouteHelperExtras;

// By some reason this line prevents all types in a file
// from being automatically exported
export {};
