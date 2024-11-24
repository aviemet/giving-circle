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

    circle

    transient do
      # Default to `false` unless specified
      template { false }
    end

    # Conditionally build or skip the association
    presentation { template ? nil : association(:presentation) }

    after(:build) do |presentation_distribution, evaluator|
      # Ensure no presentation is set if `template` is true
      if evaluator.template
        presentation_distribution.presentation = nil
      end
    end
  end
end
