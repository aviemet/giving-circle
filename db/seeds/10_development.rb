# rubocop:disable Style/SoleNestedConditional
# Development data

if Rails.env.development?

  if User.none?
    user = User.create!({
      email: "aviemet@gmail.com",
      password: "Complex1!",
      confirmed_at: 1.year.ago,
    })

    user.add_role :super_admin
  end
end
# rubocop:enable Style/SoleNestedConditional
