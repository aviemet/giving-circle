# == Schema Information
#
# Table name: presentation_distributions
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :presentation_distribution, class: 'Presentation::Distribution' do
    name { Faker::Company.buzzword.capitalize }
    type { 1 }
  end
end
