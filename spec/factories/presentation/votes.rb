# == Schema Information
#
# Table name: presentation_votes
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :presentation_vote, class: 'Presentation::Vote' do
    name { Faker::Company.buzzword.capitalize }

    circle
  end
end
