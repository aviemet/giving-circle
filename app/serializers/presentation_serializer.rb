# == Schema Information
#
# Table name: presentations
#
#  id                       :bigint           not null, primary key
#  name                     :string
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  presentation_template_id :bigint
#  theme_id                 :bigint           not null
#
# Indexes
#
#  index_presentations_on_presentation_template_id  (presentation_template_id)
#  index_presentations_on_theme_id                  (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_template_id => presentation_templates.id)
#  fk_rails_...  (theme_id => themes.id)
#
class PresentationSerializer < ApplicationSerializer
  object_as :presentation

  attributes(
    :theme_id,
    :name,
  )
end
