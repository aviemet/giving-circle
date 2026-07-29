require "rails_helper"

RSpec.describe "Presentation interaction response serializers" do
  it "renders show edit and form_data views" do
    response_record = create(:presentation_interaction_response)

    expect(Presentation::InteractionResponses::ShowSerializer.one(response_record)).to be_present
    expect(Presentation::InteractionResponses::EditSerializer.one(response_record)).to be_present
    expect(Presentation::InteractionResponses::FormDataSerializer.one(response_record)).to be_present
  end
end
