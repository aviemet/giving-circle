# == Schema Information
#
# Table name: templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb            not null
#  slides     :jsonb            not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_templates_on_slug  (slug) UNIQUE
#
require "rails_helper"

RSpec.describe Template, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
