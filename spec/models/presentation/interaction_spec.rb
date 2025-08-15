# == Schema Information
#
# Table name: presentation_interactions
#
#  id                 :uuid             not null, primary key
#  config             :jsonb
#  interaction_type   :integer
#  results            :jsonb
#  slug               :string
#  trigger_conditions :jsonb
#  trigger_type       :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_presentation_interactions_on_slug  (slug) UNIQUE
#
require "rails_helper"

RSpec.describe Presentation::Interaction, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
