const urlParams = {
  "root": {
    "params": []
  },
  "newUserSession": {
    "params": []
  },
  "userSession": {
    "params": []
  },
  "destroyUserSession": {
    "params": []
  },
  "newUserPassword": {
    "params": []
  },
  "editUserPassword": {
    "params": []
  },
  "userPassword": {
    "params": []
  },
  "cancelUserRegistration": {
    "params": []
  },
  "newUserRegistration": {
    "params": []
  },
  "editUserRegistration": {
    "params": []
  },
  "userRegistration": {
    "params": []
  },
  "newUserConfirmation": {
    "params": []
  },
  "userConfirmation": {
    "params": []
  },
  "newUserUnlock": {
    "params": []
  },
  "userUnlock": {
    "params": []
  },
  "home": {
    "params": []
  },
  "users": {
    "params": []
  },
  "newUser": {
    "params": []
  },
  "editUser": {
    "params": [
      "id"
    ]
  },
  "user": {
    "params": [
      "id"
    ]
  },
  "people": {
    "params": []
  },
  "newPerson": {
    "params": []
  },
  "editPerson": {
    "params": [
      "slug"
    ]
  },
  "person": {
    "params": [
      "slug"
    ]
  },
  "orgs": {
    "params": []
  },
  "circles": {
    "params": []
  },
  "aboutCircle": {
    "params": [
      "circle_slug"
    ]
  },
  "orgAbout": {
    "params": [
      "circle_slug",
      "org_slug"
    ]
  },
  "circleOrgs": {
    "params": [
      "circle_slug"
    ]
  },
  "newCircleOrg": {
    "params": [
      "circle_slug"
    ]
  },
  "editOrg": {
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "org": {
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "themeAbout": {
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "themeOrgs": {
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "themeOrgsImport": {
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "themeOrgIndex": {
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "newThemeOrg": {
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "presentationActive": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "presentationDistributions": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "newPresentationDistribution": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "editDistribution": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "distribution": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "presentationElements": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "newPresentationElement": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "editElement": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "element": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "presentationSlides": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "newPresentationSlide": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "editSlide": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "slide": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "presentationVotes": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "newPresentationVote": {
    "params": [
      "circle_slug",
      "presentation_slug"
    ]
  },
  "editVote": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "vote": {
    "params": [
      "circle_slug",
      "id"
    ]
  },
  "themePresentations": {
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "newThemePresentation": {
    "params": [
      "circle_slug",
      "theme_slug"
    ]
  },
  "editPresentation": {
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "presentation": {
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "circleThemes": {
    "params": [
      "circle_slug"
    ]
  },
  "newCircleTheme": {
    "params": [
      "circle_slug"
    ]
  },
  "editTheme": {
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "theme": {
    "params": [
      "circle_slug",
      "slug"
    ]
  },
  "editCircle": {
    "params": [
      "circle_slug"
    ]
  },
  "circle": {
    "params": [
      "circle_slug"
    ]
  },
  "activePresentationShow": {
    "params": [
      "presentation_slug"
    ]
  },
  "activePresentationSettings": {
    "params": [
      "presentation_slug"
    ]
  },
  "settings": {
    "params": []
  },
  "settingsGeneral": {
    "params": []
  },
  "settingsAppearance": {
    "params": []
  },
  "settingsIntegrations": {
    "params": []
  },
  "settingsLocalizations": {
    "params": []
  },
  "settingsNotifications": {
    "params": []
  },
  "apiUsers": {
    "params": []
  },
  "apiUser": {
    "params": [
      "id"
    ]
  },
  "apiUpdateTablePreferences": {
    "params": [
      "id"
    ]
  },
  "apiUpdateUserPreferences": {
    "params": [
      "id"
    ]
  },
  "apiSearches": {
    "params": []
  },
  "apiSpotlights": {
    "params": []
  },
  "updateRailsDiskService": {
    "params": [
      "encoded_token"
    ]
  }
} as const;

export default urlParams;