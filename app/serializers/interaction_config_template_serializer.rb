# == Schema Information
#
# Table name: interaction_config_templates
#
#  id         :uuid             not null, primary key
#  config     :jsonb            not null
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_interaction_config_templates_on_circle_id           (circle_id)
#  index_interaction_config_templates_on_circle_id_and_slug  (circle_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class InteractionConfigTemplateSerializer < ApplicationSerializer
  object_as :interaction_config_template

  identifier :slug

  attributes(
    :name,
    :config,
  )
end
