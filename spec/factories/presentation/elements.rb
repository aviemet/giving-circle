# == Schema Information
#
# Table name: presentation_elements
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  slug       :string
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_presentation_elements_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :presentation_element, class: "Presentation::Element" do
    name { Faker::Company.buzzword.capitalize }
    data { {} }
  end
end
