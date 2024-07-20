const urlParams = {
  "root": {
    "path": "/",
    "params": []
  },
  "newUserSession": {
    "path": "/login",
    "params": []
  },
  "userSession": {
    "path": "/login",
    "params": []
  },
  "destroyUserSession": {
    "path": "/logout",
    "params": []
  },
  "newUserPassword": {
    "path": "/users/password/new",
    "params": []
  },
  "editUserPassword": {
    "path": "/users/password/edit",
    "params": []
  },
  "userPassword": {
    "path": "/users/password",
    "params": []
  },
  "cancelUserRegistration": {
    "path": "/users/cancel",
    "params": []
  },
  "newUserRegistration": {
    "path": "/users/register",
    "params": []
  },
  "editUserRegistration": {
    "path": "/users/edit",
    "params": []
  },
  "userRegistration": {
    "path": "/users",
    "params": []
  },
  "newUserConfirmation": {
    "path": "/users/confirmation/new",
    "params": []
  },
  "userConfirmation": {
    "path": "/users/confirmation",
    "params": []
  },
  "newUserUnlock": {
    "path": "/users/unlock/new",
    "params": []
  },
  "userUnlock": {
    "path": "/users/unlock",
    "params": []
  },
  "home": {
    "path": "/",
    "params": []
  },
  "users": {
    "path": "/users",
    "params": []
  },
  "newUser": {
    "path": "/users/new",
    "params": []
  },
  "editUser": {
    "path": "/users/:id/edit",
    "params": [
      "id"
    ]
  },
  "user": {
    "path": "/users/:id",
    "params": [
      "id"
    ]
  },
  "people": {
    "path": "/people",
    "params": []
  },
  "newPerson": {
    "path": "/people/new",
    "params": []
  },
  "editPerson": {
    "path": "/people/:slug/edit",
    "params": [
      "slug"
    ]
  },
  "person": {
    "path": "/people/:slug",
    "params": [
      "slug"
    ]
  },
  "orgs": {
    "path": "/orgs",
    "params": []
  },
  "groups": {
    "path": "/groups",
    "params": []
  },
  "circleAbout": {
    "path": "/circles/:circle_slug/about",
    "params": [
      "circle_slug"
    ]
  },
  "circleGroups": {
    "path": "/circles/:circle_slug/groups",
    "params": [
      "circle_slug"
    ]
  },
  "newCircleGroup": {
    "path": "/circles/:circle_slug/groups/new",
    "params": [
      "circle_slug"
    ]
  },
  "editGroup": {
    "path": "/groups/:slug/edit",
    "params": [
      "slug"
    ]
  },
  "group": {
    "path": "/groups/:slug",
    "params": [
      "slug"
    ]
  },
  "circleMembers": {
    "path": "/circles/:circle_slug/members",
    "params": [
      "circle_slug"
    ]
  },
  "newCircleMember": {
    "path": "/circles/:circle_slug/members/new",
    "params": [
      "circle_slug"
    ]
  },
  "editCircleMember": {
    "path": "/circles/:circle_slug/members/:slug/edit",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circleMember": {
    "path": "/circles/:circle_slug/members/:slug",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circleOrgAbout": {
    "path": "/circles/:circle_slug/orgs/:org_slug/about",
    "params": [
      "circle_slug",
      "org_slug"
    ]
  },
  "circleOrgs": {
    "path": "/circles/:circle_slug/orgs",
    "params": [
      "circle_slug"
    ]
  },
  "newCircleOrg": {
    "path": "/circles/:circle_slug/orgs/new",
    "params": [
      "circle_slug"
    ]
  },
  "editCircleOrg": {
    "path": "/circles/:circle_slug/orgs/:slug/edit",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circleOrg": {
    "path": "/circles/:circle_slug/orgs/:slug",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circlePresentationTemplates": {
    "path": "/circles/:circle_slug/presentation_templates",
    "params": [
      "circle_slug"
    ]
  },
  "newCirclePresentationTemplate": {
    "path": "/circles/:circle_slug/presentation_templates/new",
    "params": [
      "circle_slug"
    ]
  },
  "editCirclePresentationTemplate": {
    "path": "/circles/:circle_slug/presentation_templates/:slug/edit",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circlePresentationTemplate": {
    "path": "/circles/:circle_slug/presentation_templates/:slug",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circleThemeAbout": {
    "path": "/circles/:circle_slug/themes/:theme_slug/about",
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "circleThemeMembers": {
    "path": "/circles/:circle_slug/themes/:theme_slug/members",
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "newCircleThemeMember": {
    "path": "/circles/:circle_slug/themes/:theme_slug/members/new",
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "editCircleThemeMember": {
    "path": "/circles/:circle_slug/themes/:theme_slug/members/:slug/edit",
    "params": [
      "circle_slug",
      "theme_slug",
      "slug"
    ]
  },
  "circleThemeMember": {
    "path": "/circles/:circle_slug/themes/:theme_slug/members/:slug",
    "params": [
      "circle_slug",
      "theme_slug",
      "slug"
    ]
  },
  "circleThemeOrgs": {
    "path": "/circles/:circle_slug/themes/:theme_slug/orgs",
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "circleThemeOrgsImport": {
    "path": "/circles/:circle_slug/themes/:theme_slug/orgs/import",
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "circleThemeOrgIndex": {
    "path": "/circles/:circle_slug/themes/:theme_slug/orgs",
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "newCircleThemeOrg": {
    "path": "/circles/:circle_slug/themes/:theme_slug/orgs/new",
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "editCircleThemeOrg": {
    "path": "/circles/:circle_slug/themes/:theme_slug/orgs/:slug/edit",
    "params": [
      "circle_slug",
      "theme_slug",
      "slug"
    ]
  },
  "circleThemeOrg": {
    "path": "/circles/:circle_slug/themes/:theme_slug/orgs/:slug",
    "params": [
      "circle_slug",
      "theme_slug",
      "slug"
    ]
  },
  "circleThemes": {
    "path": "/circles/:circle_slug/themes",
    "params": [
      "circle_slug"
    ]
  },
  "newCircleTheme": {
    "path": "/circles/:circle_slug/themes/new",
    "params": [
      "circle_slug"
    ]
  },
  "editCircleTheme": {
    "path": "/circles/:circle_slug/themes/:slug/edit",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circleTheme": {
    "path": "/circles/:circle_slug/themes/:slug",
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "themePresentations": {
    "path": "/themes/:theme_slug/presentations",
    "params": [
      "theme_slug"
    ]
  },
  "newThemePresentation": {
    "path": "/themes/:theme_slug/presentations/new",
    "params": [
      "theme_slug"
    ]
  },
  "editPresentation": {
    "path": "/presentations/:id/edit",
    "params": [
      "id"
    ]
  },
  "presentation": {
    "path": "/presentations/:id",
    "params": [
      "id"
    ]
  },
  "circles": {
    "path": "/circles",
    "params": []
  },
  "newCircle": {
    "path": "/circles/new",
    "params": []
  },
  "editCircle": {
    "path": "/circles/:slug/edit",
    "params": [
      "slug"
    ]
  },
  "circle": {
    "path": "/circles/:slug",
    "params": [
      "slug"
    ]
  },
  "runPresentation": {
    "path": "/presentation/:id",
    "params": [
      "id"
    ]
  },
  "settings": {
    "path": "/settings",
    "params": []
  },
  "settingsGeneral": {
    "path": "/settings/general",
    "params": []
  },
  "settingsAppearance": {
    "path": "/settings/appearance",
    "params": []
  },
  "settingsIntegrations": {
    "path": "/settings/integrations",
    "params": []
  },
  "settingsLocalizations": {
    "path": "/settings/localizations",
    "params": []
  },
  "settingsNotifications": {
    "path": "/settings/notifications",
    "params": []
  },
  "apiUsers": {
    "path": "/api/users",
    "params": []
  },
  "apiUser": {
    "path": "/api/users/:id",
    "params": [
      "id"
    ]
  },
  "apiUpdateTablePreferences": {
    "path": "/api/users/:id/update_table_preferences",
    "params": [
      "id"
    ]
  },
  "apiUpdateUserPreferences": {
    "path": "/api/users/:id/update_user_preferences",
    "params": [
      "id"
    ]
  },
  "apiSearches": {
    "path": "/api/searches",
    "params": []
  },
  "apiSpotlights": {
    "path": "/api/spotlights",
    "params": []
  },
  "updateRailsDiskService": {
    "path": "/rails/active_storage/disk/:encoded_token",
    "params": [
      "encoded_token"
    ]
  }
} as const;

export default urlParams;