# == Schema Information
#
# Table name: templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb            not null
#  slug       :string
#  version    :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_templates_on_circle_id  (circle_id)
#  index_templates_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
require "rails_helper"

RSpec.describe Template, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
