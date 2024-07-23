if Rails.env.development?
  circle = Circle.find_by(slug: 'empty-circle')
  user = User.first

  if circle.nil?
    circle = Circle.create!({
      name: "Empty Circle",
    })

    user.add_role :admin, circle
  end
end
