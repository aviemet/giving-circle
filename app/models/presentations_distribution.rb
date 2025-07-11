# == Schema Information
#
# Table name: presentations_distributions
#
#  id                           :uuid             not null, primary key
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  presentation_distribution_id :uuid             not null
#  presentation_id              :uuid             not null
#
# Indexes
#
#  idx_on_presentation_distribution_id_1e817598d7        (presentation_distribution_id)
#  index_presentations_distributions_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_distribution_id => presentation_distributions.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
class PresentationsDistribution < ApplicationRecord
  belongs_to :presentation
  belongs_to :distribution, class_name: "Presentation::Distribution", foreign_key: "presentation_distribution_id", inverse_of: :presentations_distributions
end
