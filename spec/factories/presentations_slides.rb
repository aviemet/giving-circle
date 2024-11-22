FactoryBot.define do
  factory :presentations_slide do
    presentation
    slide factory: :presentation_slide
  end
end
