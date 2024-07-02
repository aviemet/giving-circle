FactoryBot.define do
  factory :template_slide do
    title { "MyString" }
    content { "MyText" }
    template { nil }
    order { 1 }
  end
end
