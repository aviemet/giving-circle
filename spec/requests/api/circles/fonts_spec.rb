require "rails_helper"
require_relative "../../../support/devise"

RSpec.describe "Api::Circles::Fonts", type: :request do
  describe "GET /api/circles/:circle_slug/fonts" do
    login_super_admin

    it "returns attached fonts for the circle" do
      circle = @admin.circles.first
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes"),
        filename: "Brand Sans.woff2",
        content_type: "font/woff2",
      )
      circle.fonts.attach(blob)

      get api_circle_fonts_path(circle_slug: circle.slug)

      expect(response).to have_http_status(:ok)
      body = response.parsed_body
      expect(body).to be_an(Array)
      expect(body.first).to include(
        "family" => "Brand Sans",
        "filename" => "Brand Sans.woff2",
      )
      expect(body.first["url"]).to include("/rails/active_storage/blobs/redirect/")
      expect(body.first["signed_id"]).to be_present
    end
  end

  describe "POST /api/circles/:circle_slug/fonts" do
    login_super_admin

    it "attaches a font blob to the circle" do
      circle = @admin.circles.first
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes"),
        filename: "Display.ttf",
        content_type: "font/ttf",
      )

      expect {
        post api_circle_fonts_path(circle_slug: circle.slug), params: { signed_id: blob.signed_id }
      }.to change { circle.fonts.count }.by(1)

      expect(response).to have_http_status(:created)
      expect(response.parsed_body).to include(
        "family" => "Display",
        "filename" => "Display.ttf",
      )
    end

    it "rejects non-font content types" do
      circle = @admin.circles.first
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("not-a-font"),
        filename: "notes.txt",
        content_type: "text/plain",
      )

      post api_circle_fonts_path(circle_slug: circle.slug), params: { signed_id: blob.signed_id }

      expect(response).to have_http_status(:unprocessable_content)
      expect(circle.fonts.count).to eq(0)
    end
  end
end
