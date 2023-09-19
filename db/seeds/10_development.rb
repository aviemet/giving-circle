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
      name: "Battery Powered"
    })
    user.add_role :admin, circle
  end

end
