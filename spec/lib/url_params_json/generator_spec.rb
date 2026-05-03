require_relative "../../spec_helper"
require_relative "../../../lib/url_params_json"

RSpec.describe UrlParamsJson::Generator do
  describe ".ts_file_body" do
    it "uses a named export so routes/index can re-export urlParams" do
      body = described_class.ts_file_body("home" => { "params" => [] })
      expect(body).to start_with("export const urlParams = ")
      expect(body).to end_with(" as const;\n")
      expect(body).not_to include("export default")
    end
  end
end
