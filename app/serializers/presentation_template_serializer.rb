# == Schema Information
#
# Table name: presentation_templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_presentation_templates_on_circle_id  (circle_id)
#  index_presentation_templates_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class PresentationTemplateSerializer < ApplicationSerializer
  object_as :presentation_template

  identifier :slug

  attributes(
    :name,
  )
end
