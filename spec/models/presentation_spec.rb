# == Schema Information
#
# Table name: presentations
#
#  id               :uuid             not null, primary key
#  active           :boolean          default(FALSE), not null
#  name             :string           not null
#  settings         :jsonb
#  slug             :string
#  template_version :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  active_slide_id  :uuid
#  template_id      :uuid
#  theme_id         :uuid             not null
#
# Indexes
#
#  index_presentations_on_active_slide_id  (active_slide_id)
#  index_presentations_on_slug             (slug) UNIQUE
#  index_presentations_on_template_id      (template_id)
#  index_presentations_on_theme_id         (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (active_slide_id => slides.id)
#  fk_rails_...  (template_id => templates.id)
#  fk_rails_...  (theme_id => themes.id)
#
require "rails_helper"

RSpec.describe Presentation do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build(:presentation)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(name).each do |attr|
        expect(build(:presentation, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:theme) }
    it { is_expected.to have_many(:memberships).through(:presentations_memberships) }
    it { is_expected.to have_many(:orgs).through(:presentations_orgs) }
    it { is_expected.to have_many(:elements).through(:presentations_elements) }

    describe "#orgs" do
      it "includes ask_cents and ask_currency from the join table" do
        presentation = create(:presentation)
        org = create(:org, circle: presentation.circle)
        create(:presentations_org, presentation: presentation, org: org, ask_cents: 20_000, ask_currency: "USD")

        loaded = presentation.orgs.find { |presentation_org| presentation_org.id == org.id }

        expect(loaded.ask_cents).to eq(20_000)
        expect(loaded.ask_currency).to eq("USD")
      end

      it "returns a successful count value" do
        presentation = create(:presentation)
        first_org = create(:org, circle: presentation.circle)
        second_org = create(:org, circle: presentation.circle)
        create(:presentations_org, presentation: presentation, org: first_org)
        create(:presentations_org, presentation: presentation, org: second_org)
        create(:org, circle: presentation.circle)

        expect(presentation.orgs.count).to eq(2)
      end

      it "loads ask values when accessed after includes_associated" do
        presentation = create(:presentation)
        org = create(:org, circle: presentation.circle)
        create(:presentations_org, presentation: presentation, org: org, ask_cents: 20_000, ask_currency: "USD")

        loaded = described_class.includes_associated.find(presentation.id)
        presentation_org = loaded.orgs.find { |candidate| candidate.id == org.id }

        expect(presentation_org.ask_cents).to eq(20_000)
        expect(presentation_org.ask_currency).to eq("USD")
      end
    end
  end

  describe "org sync" do
    it "copies theme orgs after create when presentation has none" do
      theme = create(:theme)
      org = create(:org, circle: theme.circle)
      create(:themes_org, theme: theme, org: org)

      presentation = create(:presentation, theme: theme)

      expect(presentation.orgs).to contain_exactly(org)
    end
  end
end
