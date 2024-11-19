FactoryBot.define do
  factory :presentation_distribution, class: 'Presentation::Distribution' do
    name { "MyString" }
    type { 1 }
  end
end
