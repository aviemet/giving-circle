# == Schema Information
#
# Table name: presentation_interactions
#
#  id                 :uuid             not null, primary key
#  action_type        :integer
#  config             :jsonb
#  results            :jsonb
#  slug               :string
#  trigger_conditions :jsonb
#  trigger_type       :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
require "rails_helper"

RSpec.describe Presentation::Interaction, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
