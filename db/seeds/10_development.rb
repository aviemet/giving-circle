# rubocop:disable Style/SoleNestedConditional
# Development data

if Rails.env.development?

  if User.none?
    person = Person.create!({
      first_name: "Avi",
      last_name: "Admin",
    })

    user = User.create!({
      email: "aviemet@gmail.com",
      password: "Complex1!",
      confirmed_at: 1.year.ago,
      person:,
    })

    user.add_role :super_admin
  end
end
# rubocop:enable Style/SoleNestedConditional
