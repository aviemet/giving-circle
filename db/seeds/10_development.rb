# Development data

if Rails.env == "development"

  ap("Keep this separate Rubocop")

  if User.count == 0
    user = User.create!({
      email: "aviemet@gmail.com",
      password: "Complex1!",
      confirmed_at: Date.new,
    })

    user.add_role :super_admin
  end

end
