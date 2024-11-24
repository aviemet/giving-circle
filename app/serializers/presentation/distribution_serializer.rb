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
class Presentation::DistributionSerializer < ApplicationSerializer
  object_as :distribution, model: "Presentation::Distribution"

  attributes(
    :name,
    :template,
    :type,
  )

end
