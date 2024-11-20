# == Schema Information
#
# Table name: presentations_elements
#
#  id                      :uuid             not null, primary key
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  presentation_element_id :uuid             not null
#  presentation_id         :uuid             not null
#
# Indexes
#
#  index_presentations_elements_on_presentation_element_id  (presentation_element_id)
#  index_presentations_elements_on_presentation_id          (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_element_id => presentation_elements.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
class PresentationsElement < ApplicationRecord
  belongs_to :presentation
  belongs_to :presentation_element
end
