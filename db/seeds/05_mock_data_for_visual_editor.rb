if MockCircle.none?
  MockCircle.transaction do
    circle = MockCircle.create!(name: "Mock Circle")

    theme = Theme.create!(
      name: "Mock Theme",
      circle:,
    )

    presentation = Presentation.create!(
      name: "Mock Presentation",
      theme:,
    )

    5.times do
      FactoryBot.create(:membership, circle:)
    end

    (1..10).each do |index|
      org = Org.create!(
        name: "Mock Org #{index}",
        description: "This is mock organization #{index} for testing purposes",
        circle:,
      )

      ThemesOrg.create!(
        theme:,
        org:,
        ask_cents: 25_000_000,
      )

      presentation.orgs << org
    end
  end
end
