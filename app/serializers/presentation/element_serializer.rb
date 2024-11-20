# == Schema Information
#
# Table name: presentation_elements
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Presentation::ElementSerializer < ApplicationSerializer
  object_as :presentation_element
  
  attributes(
    :name,
    :data,
    :element,
  )
end