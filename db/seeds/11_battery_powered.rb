if Rails.env.development?
  circle = Circle.find_by(slug: "battery-powered")
  user = User.find_by(email: "aviemet@gmail.com")

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

    if circle.themes.empty?
      FactoryBot.create(:theme, circle:)
    end

    theme = circle.themes.first

    if theme.orgs.empty?
      10.times do
        FactoryBot.create(:themes_org, theme:)
      end
    end

  end
end
