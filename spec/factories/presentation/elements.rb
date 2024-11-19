FactoryBot.define do
  factory :presentation_element, class: 'Presentation::Element' do
    name { "MyString" }
    template { false }
    data { "" }
  end
end
