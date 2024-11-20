# == Schema Information
#
# Table name: presentation_slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  order      :integer
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :presentation_slide, class: 'Presentation::Slide' do
    name { Faker::Company.buzzword.capitalize }
  end
end
