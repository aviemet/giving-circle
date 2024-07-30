# == Schema Information
#
# Table name: presentation_slides
#
#  id                       :uuid             not null, primary key
#  content                  :text
#  name                     :string
#  order                    :integer
#  slug                     :string           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  presentation_id          :uuid
#  presentation_template_id :uuid
#
# Indexes
#
#  index_presentation_slides_on_presentation_id           (presentation_id)
#  index_presentation_slides_on_presentation_template_id  (presentation_template_id)
#  index_presentation_slides_on_slug                      (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (presentation_id => presentations.id)
#  fk_rails_...  (presentation_template_id => presentation_templates.id)
#
class PresentationSlideSerializer < ApplicationSerializer
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
