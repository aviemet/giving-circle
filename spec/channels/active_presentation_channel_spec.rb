require "rails_helper"

RSpec.describe ActivePresentationChannel, type: :channel do
  let(:presentation) { create(:presentation) }
  let(:slide) { create(:slide) }

  before do
    presentation.slides << slide
  end

  it "subscribes and streams for the presentation" do
    subscribe(presentation_id: presentation.id)

    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_for(presentation)
  end

  it "switches the active slide" do
    subscribe(presentation_id: presentation.id)

    perform :switch_slide, {
      "presentation_id" => presentation.id,
      "slide_id" => slide.id,
    }

    expect(presentation.reload.active_slide).to eq(slide)
  end
end
