# == Schema Information
#
# Table name: interaction_ui_templates
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_interaction_ui_templates_on_slug  (slug) UNIQUE
#
class InteractionUiTemplateSerializer < ApplicationSerializer
  object_as :interaction_ui_template

  identifier :slug

  attributes(
    name: { type: :string },
  )
end
