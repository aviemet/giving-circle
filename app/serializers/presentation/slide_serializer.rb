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
class Presentation::SlideSerializer < ApplicationSerializer
  object_as :presentation_slide
  identifier :slug
  attributes(
    :name,
    :content,
    :order,
    :presentation_id,
    :presentation_template_id,
  )
end
