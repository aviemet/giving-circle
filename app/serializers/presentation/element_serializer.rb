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
class Presentation::ElementSerializer < ApplicationSerializer
  object_as :element, model: "Presentation::Element"

  attributes(
    :name,
    :data,
    :template,
  )
end
