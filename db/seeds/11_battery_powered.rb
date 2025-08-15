require "securerandom"

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
    template = FactoryBot.create(:template, name: "Allocation Night", circle: circle)

    slide = FactoryBot.create(:slide, {
      title: "Introduction",
      data: {
        content: [
          {
            type: "Heading",
            props: {
              title: "Introduction",
              padding: 16,
              order: 1,
              color: "#FFFFFF",
              id: "Heading-#{SecureRandom.uuid}"
            },
          },
        ],
        root: {
          props: {
            title: "Introduction",
            backgroundColor:  "#000000",
          },
        },
        zones: {}
      }
    },)

    FactoryBot.create(:slide_parent, {
      slide: slide,
      parentable: template,
      order: 1,
    },)

  end

  if circle.themes.empty?
    FactoryBot.create(:theme, circle: circle)
  end

  theme = circle.themes.first

  if theme&.orgs&.empty?
    10.times do
      FactoryBot.create(:themes_org, { circle:, theme: })
    end
  end

  if theme&.presentations&.empty?
    template = circle.templates.first
    if template
      presentation = template.create_presentation("Allocation Night", theme)
      presentation.settings = {
        question: Faker::ChuckNorris.fact,
        matched_funds_multiplier: 2,
      }
      presentation.save!
    end
  end

  presentation = theme&.presentations&.first

  if presentation&.memberships&.empty?
    presentation.memberships << circle.memberships
  end

  if presentation&.orgs&.empty?
    presentation.orgs << theme.orgs
  end
end
