# == Schema Information
#
# Table name: slides
#
#  id              :uuid             not null, primary key
#  data            :jsonb
#  slug            :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  source_slide_id :uuid
#
# Indexes
#
#  index_slides_on_slug             (slug)
#  index_slides_on_source_slide_id  (source_slide_id)
#
# Foreign Keys
#
#  fk_rails_...  (source_slide_id => slides.id)
#
require "rails_helper"

RSpec.describe Slide, type: :model do
  describe "Associations" do
    it { is_expected.to have_one(:slide_parent) }
    it { is_expected.to have_one(:template).through(:slide_parent) }
    it { is_expected.to have_one(:presentation).through(:slide_parent) }
    it { is_expected.to belong_to(:source_slide).optional }
  end

  describe "slide parents" do
    it "links a slide to a template" do
      template = create(:template)
      slide = create(:slide)
      create(:slide_parent, slide:, parentable: template)

      expect(slide.slide_parent.parentable).to eq(template)
    end

    it "links a slide to a presentation" do
      presentation = create(:presentation)
      slide = create(:slide)
      create(:slide_parent, slide:, parentable: presentation)

      expect(slide.slide_parent.parentable).to eq(presentation)
    end
  end

  describe "destroy callbacks" do
    it "nullifies active_slide references and removes slide parents" do
      presentation = create(:presentation)
      slide = create(:slide)
      presentation.slides << slide
      presentation.update!(active_slide: slide)

      expect {
        slide.destroy!
      }.to change(SlideParent, :count).by(-1)

      expect(presentation.reload.active_slide_id).to be_nil
    end
  end
end
