# == Schema Information
#
# Table name: slides
#
#  id              :uuid             not null, primary key
#  data            :jsonb
#  slug            :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  source_slide_id :uuid
#
# Indexes
#
#  index_slides_on_slug             (slug)
#  index_slides_on_source_slide_id  (source_slide_id)
#
# Foreign Keys
#
#  fk_rails_...  (source_slide_id => slides.id)
#
require "rails_helper"

RSpec.describe Slide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
