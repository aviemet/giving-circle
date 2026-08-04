# == Schema Information
#
# Table name: templates_message_templates
#
#  id                  :uuid             not null, primary key
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  message_template_id :uuid             not null
#  template_id         :uuid             not null
#
# Indexes
#
#  index_templates_message_templates_on_message_template_id  (message_template_id)
#  index_templates_message_templates_on_template_id          (template_id)
#  index_templates_message_templates_uniqueness              (template_id,message_template_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (message_template_id => message_templates.id)
#  fk_rails_...  (template_id => templates.id)
#
class TemplatesMessageTemplate < ApplicationRecord
  belongs_to :template
  belongs_to :message_template

  validates :message_template_id, uniqueness: { scope: :template_id }
end
