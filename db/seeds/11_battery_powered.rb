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
      circle.members << FactoryBot.create(:member)
    end
  end

  if circle.themes.empty?
    FactoryBot.create(:theme, circle: circle)
  end

  theme = circle.themes.first

  if theme.orgs.empty?
    10.times do
      ThemesOrg.create!({
        theme:,
        org: FactoryBot.create(:org, circle: circle),
        ask_cents: Faker::Number.between(from: 20000000, to: 30000000)
      })
    end
  end

  if theme.presentations.empty?
    presentation = FactoryBot.build(:presentation, name: "Allocation Night", theme: theme)
    presentation.settings = {
      question: Faker::ChuckNorris.fact,
      matched_funds_multiplier: 2,
    }
    presentation.save
  end

  presentation = theme.presentations.first

  if presentation.members.empty?
    presentation.members << theme.members
  end

  if presentation.orgs.empty?
    presentation.orgs << theme.orgs
  end

  if presentation.slides.empty?
    presentation.slides << PresentationSlide.create({
      name: "Intro",
      content: "<div><h1>Intro</h1></div>",
    })

    presentation.slides << PresentationSlide.create({
      name: "All Orgs",
      content: "<div><h1>All Orgs</h1></div>",
    })

    presentation.slides << PresentationSlide.create({
      name: "Timer",
      content: "<div>{{Timer(600)}}</div>",
    })

    presentation.slides << PresentationSlide.create({
      name: "Top Orgs",
      content: "<div>Top Orgs</div>",
    })

    presentation.slides << PresentationSlide.create({
      name: "Allocation",
      content: "<div>{{Graph}}</div>",
    })

    presentation.slides << PresentationSlide.create({
      name: "Results",
      content: "<div>{{Results}}</div>",
    })
  end

  if presentation.votes.empty?
    presentation.votes << PresentationVote.create({
      name: "Round 1",
      type: "chit",
    })

    presentation.votes << PresentationVote.create({
      name: "Round 2",
      type: "value",
    })
  end
end
