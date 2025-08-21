if MockCircle.none?
  MockCircle.transaction do
    circle = MockCircle.create(
      name: "Mock Circle",
    )

    theme = Theme.create(
      name: "Mock Theme",
      circle:,
    )

    presentation = Presentation.create(
      name: "Mock Presentation",
      theme:,
    )

    (1..10).map do |i|
      org = Org.create(
        name: "Mock Org #{i}",
        description: "This is mock organization #{i} for testing purposes",
        circle: circle,
      )

      ThemesOrg.create(
        theme: theme,
        org: org,
        ask_cents: 25000000,
      )

      presentation.orgs << org
    end
  end
end
