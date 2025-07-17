if Rails.env.development?
  circle = Circle.find_by(slug: "battery-powered")
  user = User.first

  if circle.nil?
    circle = Circle.create!({
      name: "Battery Powered",
    })

    user.add_role :admin, circle
  end

  if circle.memberships.empty?
    50.times do
      FactoryBot.create(:membership, circle: circle)
    end
  end

  if circle.templates.empty?
    FactoryBot.create(:template, circle: circle, slides: {
      id: 1,
      name: "Introduction",
      order: 1,

      zones: {
        content: [
          {
            type: "HeadingBlock",
            props: {
              content: "Introduction",
              fontSize: "24px",
              color: "#333"
            },
          },
        ]
      },
    },)
  end

  if circle.themes.empty?
    FactoryBot.create(:theme, circle: circle)
  end

  theme = circle.themes.first

  if theme.orgs.empty?
    10.times do
      FactoryBot.create(:themes_org, { circle:, theme: })
    end
  end

  if theme.presentations.empty?
    presentation = circle.templates.first.create_presentation("Allocation Night", theme)
    presentation.settings = {
      question: Faker::ChuckNorris.fact,
      matched_funds_multiplier: 2,
    }
    presentation.save!
  end

  presentation = theme.presentations.first

  if presentation.memberships.empty?
    presentation.memberships << circle.memberships
  end

  if presentation.orgs.empty?
    presentation.orgs << theme.orgs
  end
end
