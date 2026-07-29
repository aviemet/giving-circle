require "securerandom"

if Rails.env.development?
  circle = Circle.find_by(slug: "battery-powered")
  user = User.find_by(email: "aviemet@gmail.com") || User.first

  Circle.transaction do

    if circle.nil?
      circle = Circle.create!({
        name: "Battery Powered",
      })

      user&.add_role :admin, circle
    end

    if circle.memberships.empty?
      50.times do
        FactoryBot.create(:membership, circle:)
      end
    end

    if user.present?
      if user.person.blank?
        user.update!(person: Person.create!({
          first_name: "Avi",
          last_name: "Admin",
        }))
      end

      admin_membership = circle.memberships.find_by(person_id: user.person_id)
      if admin_membership.nil?
        FactoryBot.create(:membership, {
          circle:,
          person: user.person,
          name: user.person.name,
          funds_cents: 100_000,
        })
      end
    end

    if circle.templates.empty?
      template = FactoryBot.create(:template, name: "Allocation Night", circle:)

      [
        "Introduction",
        "All Orgs",
        "Timer",
        "Finalist Orgs",
        "Allocation",
        "Results",
      ].each_with_index do |title, index|
        slide = FactoryBot.create(:slide, {
          title:,
          data: {
            content: [
              {
                type: "Heading",
                props: {
                  title:,
                  padding: 16,
                  order: 1,
                  color: "#FFFFFF",
                  id: "Heading-#{SecureRandom.uuid}",
                },
              },
            ],
            root: {
              props: {
                title:,
                backgroundColor: "#000000",
              },
            },
            zones: {},
          },
        })

        FactoryBot.create(:slide_parent, {
          slide:,
          parentable: template,
          order: index + 1,
        })
      end
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

    if presentation.present? && user&.person_id.present?
      admin_membership = circle.memberships.find_by(person_id: user.person_id)
      if admin_membership.present? && !presentation.memberships.exists?(admin_membership.id)
        presentation.memberships << admin_membership
      end
    end

    if presentation&.orgs&.empty?
      presentation.orgs << theme.orgs
    end

    if presentation.present?
      InteractionConfigTemplateDefaults.seed_for_circle!(circle)

      %w[allocation-round finalist-vote pledges].each do |config_slug|
        config_template = circle.interaction_config_templates.find_by!(slug: config_slug)
        interaction = presentation.interactions.find_or_create_by!(slug: config_slug) do |record|
          record.name = config_template.name
          record.config = config_template.config.deep_dup
          record.trigger_type = :manual
          record.trigger_conditions = {}
          record.results = {}
          record.interaction_ui_template = config_template.interaction_ui_template
        end
        interaction.sync_interaction_memberships!
      end

      presentation.presentations_memberships.includes(:membership).find_each do |presentations_membership|
        presentations_membership.update!(
          funds_cents: presentations_membership.membership.funds_cents,
          funds_currency: presentations_membership.membership.funds_currency,
        )
      end
    end

  end
end
