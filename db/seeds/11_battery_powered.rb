require "securerandom"

if Rails.env.development?
  circle = Circle.find_by(slug: "battery-powered")
  user = User.first

  Circle.transaction do

    if circle.nil?
      circle = Circle.create!({
        name: "Battery Powered",
      })

      user.add_role :admin, circle
    end

    if circle.memberships.empty?
      50.times do
        FactoryBot.create(:membership, circle:)
      end
    end

    if circle.templates.empty?
      template = FactoryBot.create(:template, name: "Allocation Night", circle:)

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
      })

      FactoryBot.create(:slide_parent, {
        slide: slide,
        parentable: template,
        order: 1,
      })

    end

    if circle.themes.empty?
      FactoryBot.create(:theme, circle:)
    end

    theme = circle.themes.first

    if theme&.orgs&.empty?
      10.times do
        FactoryBot.create(:themes_org, theme:)
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

    if presentation.present?
      InteractionConfigTemplateDefaults.seed_for_circle!(circle)
      finalist_template = circle.interaction_config_templates.find_by!(slug: "finalist-vote")

      presentation.interactions.find_or_create_by!(slug: "finalist-vote") do |interaction|
        interaction.name = finalist_template.name
        interaction.config = finalist_template.config.deep_dup
        interaction.trigger_type = :manual
        interaction.trigger_conditions = {}
        interaction.results = {}
      end

      vote_budgets = [5, 10, 15, 20]
      presentation.presentations_memberships.find_each.with_index do |presentations_membership, index|
        presentations_membership.update!(funds_cents: vote_budgets[index % vote_budgets.length])
      end
    end

  end
end
