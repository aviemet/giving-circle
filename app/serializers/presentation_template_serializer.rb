# == Schema Information
#
# Table name: presentation_templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_presentation_templates_on_slug  (slug) UNIQUE
#
class PresentationTemplateSerializer < ApplicationSerializer
  object_as :presentation_template

  attributes(
    :name,
  )
end
