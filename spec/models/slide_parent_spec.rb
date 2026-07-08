# == Schema Information
#
# Table name: slide_parents
#
#  id              :uuid             not null, primary key
#  order           :integer
#  parentable_type :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  parentable_id   :uuid             not null
#  slide_id        :uuid             not null
#
# Indexes
#
#  index_slide_parents_on_parentable                         (parentable_type,parentable_id)
#  index_slide_parents_on_parentable_type_and_parentable_id  (parentable_type,parentable_id)
#  index_slide_parents_on_slide_id                           (slide_id)
#
# Foreign Keys
#
#  fk_rails_...  (slide_id => slides.id)
#
require "rails_helper"

RSpec.describe SlideParent, type: :model do
  describe "Associations" do
    it { is_expected.to belong_to(:slide) }
    it { is_expected.to belong_to(:parentable) }
  end

  describe "validations" do
    it "is valid with a template parent" do
      expect(build(:slide_parent)).to be_valid
    end

    it "is valid with a presentation parent" do
      expect(build(:slide_parent, parentable: create(:presentation))).to be_valid
    end
  end
end
