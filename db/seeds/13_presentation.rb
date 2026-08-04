if Rails.env.development?
  circle = Circle.find_by!(slug: "battery-powered")
  user = User.find_by(email: "aviemet@gmail.com")
  template = circle.templates.first!
  theme = circle.themes.first

  Circle.transaction do
    if theme.presentations.empty?
      presentation = template.create_presentation("Allocation Night", theme)
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

    if user&.person_id.present?
      admin_membership = circle.memberships.find_by(person_id: user.person_id)
      if admin_membership.present? && !presentation.memberships.exists?(admin_membership.id)
        presentation.memberships << admin_membership
      end
    end

    if presentation.orgs.empty?
      presentation.orgs << theme.orgs
    end

    if presentation.interactions.empty?
      %w[allocation-round finalist-vote pledges].each do |config_slug|
        config_template = circle.interaction_config_templates.find_by!(slug: config_slug)
        interaction = presentation.interactions.create!({
          slug: config_slug,
          name: config_template.name,
          config: config_template.config.deep_dup,
          trigger_type: :manual,
          trigger_conditions: {},
          results: {},
          interaction_ui_template: config_template.interaction_ui_template,
        })
        interaction.sync_interaction_memberships!
      end
    end

    presentation.presentations_memberships.includes(:membership).find_each do |presentations_membership|
      presentations_membership.update!(
        funds_cents: presentations_membership.membership.funds_cents,
        funds_currency: presentations_membership.membership.funds_currency,
      )
    end
  end
end
