# == Schema Information
#
# Table name: presentation_elements
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  slug       :string
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_presentation_elements_on_slug  (slug) UNIQUE
#
require "rails_helper"

RSpec.describe Presentation::Element, type: :model do
  describe "Associations" do
    it { is_expected.to have_many(:presentations_elements) }
    it { is_expected.to have_many(:presentations).through(:presentations_elements) }
  end

  describe "scopes" do
    it "filters template elements" do
      template_element = create(:presentation_element, template: true)
      create(:presentation_element, template: false)

      expect(described_class.templates).to contain_exactly(template_element)
    end
  end

  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:presentation_element)).to be_valid
    end

    it "is invalid without a name" do
      expect(build(:presentation_element, name: nil)).not_to be_valid
    end
  end

  describe "slug" do
    it "generates a slug from the name" do
      element = create(:presentation_element, name: "Unique Element Name")

      expect(element.slug).to eq("unique-element-name")
    end
  end
end
