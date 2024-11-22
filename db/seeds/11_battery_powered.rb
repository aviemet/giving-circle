if Rails.env.development?
  circle = Circle.find_by(slug: 'battery-powered')
  user = User.first

  if circle.nil?
    circle = Circle.create!({
      name: "Battery Powered",
    })

    user.add_role :admin, circle
  end

  if circle.members.empty?
    50.times do
      person = FactoryBot.create(:person)
      membership = FactoryBot.create(:membership, {circle:})
      membership.people << person
      circle.memberships << membership
    end
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
    presentation = FactoryBot.build(:presentation, {name: "Allocation Night", circle:, theme: })
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

  # if presentation.slides.empty?
  #   presentation.slides << PresentationSlide.create({
  #     name: "Intro",
  #     content: "<div><h1>Intro</h1></div>",
  #   })

  #   presentation.slides << PresentationSlide.create({
  #     name: "All Orgs",
  #     content: "<div><h1>All Orgs</h1></div>",
  #   })

  #   presentation.slides << PresentationSlide.create({
  #     name: "Timer",
  #     content: "<div>{{Timer(600)}}</div>",
  #   })

  #   presentation.slides << PresentationSlide.create({
  #     name: "Top Orgs",
  #     content: "<div>Top Orgs</div>",
  #   })

  #   presentation.slides << PresentationSlide.create({
  #     name: "Allocation",
  #     content: "<div>{{Graph}}</div>",
  #   })

  #   presentation.slides << PresentationSlide.create({
  #     name: "Results",
  #     content: "<div>{{Results}}</div>",
  #   })
  # end

  # if presentation.votes.empty?
  #   presentation.votes << PresentationVote.create({
  #     name: "Round 1",
  #     type: "chit",
  #   })

  #   presentation.votes << PresentationVote.create({
  #     name: "Round 2",
  #     type: "value",
  #   })
  # end
end
