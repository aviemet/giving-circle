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
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:presentation_interaction)).to be_valid
    end
  end

  describe "uniqueness" do
    it "enforces unique slugs at the database level" do
      create(:presentation_interaction, slug: "vote")

      expect {
        create(:presentation_interaction, slug: "vote")
      }.to raise_error(ActiveRecord::RecordNotUnique)
    end
  end
end
