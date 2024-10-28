# if Rails.env.development?
#   circle = Circle.find_by(slug: 'full-circle')
#   user = User.first

#   if circle.nil?
#     circle = Circle.create!({
#       name: "Full Circle",
#     })

#     user.add_role :admin, circle
#   end

#   if circle.members.count == 0
#     50.times do
#       circle.members << FactoryBot.create(:member)
#     end
#   end

#   if circle.themes.count == 0
#     10.times do
#       theme = FactoryBot.create(:theme, circle: circle)

#       presentation = FactoryBot.create(:presentation, theme: theme)

#       presentation.orgs << FactoryBot.create(:org, circle: circle)
#     end
#   end
# end
