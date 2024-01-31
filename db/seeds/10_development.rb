# Development data

if Rails.env == "development"

  if User.count == 0
    user = User.create!({
      email: "aviemet@gmail.com",
      password: "Complex1!",
      confirmed_at: Date.new,
    })

    user.add_role :super_admin
  end

  if Circle.count == 0
    circle = Circle.create!({
      name: "Battery Powered",
    })
    user.add_role :admin, circle
  end

  if Member.count == 0
    circle = Circle.first
    member = Member.create!({
      first_name: "Test",
      last_name: "McTesterson",
      number: 1234,
    })
    circle.members << member
  end

  if Theme.count == 0
    circle = Circle.first
    theme = Theme.create!({
      title: "Social issue needing attention",
      status: 1,
      circle:,
    })

    Presentation.create!({
      name: "Practice presentation",
      theme:,
    })
  end

  if Org.count == 0
    org = Org.create!({
      name: "Important Organization",
      description: "This organization does great things in great places",
    })
    pres = Presentation.first
    pres.orgs << org
  end

end
