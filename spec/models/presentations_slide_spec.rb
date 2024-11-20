# == Schema Information
#
# Table name: presentations_slides
#
#  id                    :uuid             not null, primary key
#  instance_name         :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  presentation_id       :uuid             not null
#  presentation_slide_id :uuid             not null
#
# Indexes
#
#  index_presentations_slides_on_presentation_id        (presentation_id)
#  index_presentations_slides_on_presentation_slide_id  (presentation_slide_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_id => presentations.id)
#  fk_rails_...  (presentation_slide_id => presentation_slides.id)
#
require 'rails_helper'

RSpec.describe PresentationsSlide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
