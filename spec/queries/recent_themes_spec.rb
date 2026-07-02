require "rails_helper"

RSpec.describe RecentThemes do
  describe ".for" do
    let(:user) { create(:user) }
    let(:circle) { create(:circle) }

    before do
      user.add_role(:admin, circle)
    end

    it "returns at most the configured limit of themes" do
      limit = described_class::LIMIT

      (limit + 2).times { create(:theme, circle: circle) }

      expect(described_class.for(user: user).size).to eq(limit)
    end

    it "orders current themes before past themes" do
      past = create(:theme, circle: circle, status: :past, name: "Past")
      current = create(:theme, circle: circle, status: :current, name: "Current")

      results = described_class.for(user: user)

      expect(results.first).to eq(current)
      expect(results).to include(past)
      expect(results.index(current)).to be < results.index(past)
    end

    it "orders by published_at descending within the same status" do
      older = create(
        :theme,
        circle: circle,
        status: :current,
        name: "Older",
        published_at: 2.days.ago,
      )
      newer = create(
        :theme,
        circle: circle,
        status: :current,
        name: "Newer",
        published_at: 1.day.ago,
      )

      results = described_class.for(user: user)

      expect(results.index(newer)).to be < results.index(older)
    end
  end
end
