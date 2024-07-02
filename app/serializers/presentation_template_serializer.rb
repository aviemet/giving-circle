# == Schema Information
#
# Table name: presentation_templates
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PresentationTemplateSerializer < ApplicationSerializer
  object_as :presentation_template

  attributes(
    :name,
  )
end
