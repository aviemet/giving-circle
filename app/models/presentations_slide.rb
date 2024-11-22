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
class PresentationsSlide < ApplicationRecord
  belongs_to :presentation
  belongs_to :slide, class_name: "Presentation::Slide", foreign_key: "presentation_slide_id", inverse_of: :presentations_slides
end
