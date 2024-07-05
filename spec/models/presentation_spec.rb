# == Schema Information
#
# Table name: presentations
#
#  id                       :uuid             not null, primary key
#  name                     :string
#  slug                     :string           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  presentation_template_id :uuid
#  theme_id                 :uuid             not null
#
# Indexes
#
#  index_presentations_on_presentation_template_id  (presentation_template_id)
#  index_presentations_on_slug                      (slug) UNIQUE
#  index_presentations_on_theme_id                  (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_template_id => presentation_templates.id)
#  fk_rails_...  (theme_id => themes.id)
#
require 'rails_helper'

RSpec.describe Presentation, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
