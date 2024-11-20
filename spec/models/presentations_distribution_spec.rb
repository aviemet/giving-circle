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
require 'rails_helper'

RSpec.describe PresentationsDistribution, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end