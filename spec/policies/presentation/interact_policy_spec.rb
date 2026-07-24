require "rails_helper"

RSpec.describe Presentation::InteractPolicy, type: :policy do
  let(:circle) { create(:circle) }
  let(:theme) { create(:theme, circle:) }
  let(:presentation) { create(:presentation, theme:, active: true) }
  let(:user) { create(:user) }
  let(:membership) { create(:membership, circle:, person: user.person) }

  before do
    create(:presentations_membership, presentation:, membership:)
  end

  describe "#show?" do
    it "allows presentation members on active presentations" do
      expect(described_class.new(user, presentation).show?).to be(true)
    end

    it "denies inactive presentations" do
      presentation.update!(active: false)

      expect(described_class.new(user, presentation).show?).to be(false)
    end

    it "denies users without a presentation membership" do
      outsider = create(:user)

      expect(described_class.new(outsider, presentation).show?).to be(false)
    end
  end

  describe "#upsert?" do
    it "allows members when an interaction is accepting responses" do
      create(:presentation_interaction, presentation:, accepting_responses: true)

      expect(described_class.new(user, presentation).upsert?).to be(true)
    end

    it "denies members when no interaction is accepting responses" do
      create(:presentation_interaction, presentation:, accepting_responses: false)

      expect(described_class.new(user, presentation).upsert?).to be(false)
    end
  end
end
