require "rails_helper"

RSpec.describe "Previews", type: :request do
  describe "GET /preview/slide" do
    it "renders a successful response" do
      get preview_slide_path

      expect(response).to be_successful
    end
  end
end
