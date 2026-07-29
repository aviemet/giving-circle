require "rails_helper"
require_relative "../../support/devise"

RSpec.describe "Api::Smtps", type: :request do
  login_super_admin

  describe "POST /api/smtp/test" do
    it "returns success when SMTP authentication succeeds" do
      smtp_client = instance_double(Net::SMTP)
      allow(Net::SMTP).to receive(:new).and_return(smtp_client)
      allow(smtp_client).to receive(:enable_starttls)
      allow(smtp_client).to receive(:start).and_yield

      post api_smtp_test_path, params: {
        smtp: {
          name: "Test",
          host: "smtp.example.com",
          domain: "example.com",
          port: 587,
          security: "tls",
          username: "user",
          password: "secret",
        },
      }

      expect(response).to be_successful
      expect(response.parsed_body["success"]).to be(true)
    end

    it "returns failure when SMTP authentication fails" do
      smtp_client = instance_double(Net::SMTP)
      allow(Net::SMTP).to receive(:new).and_return(smtp_client)
      allow(smtp_client).to receive(:enable_starttls)
      allow(smtp_client).to receive(:start).and_raise(Net::SMTPAuthenticationError.new("bad credentials"))

      post api_smtp_test_path, params: {
        smtp: {
          name: "Test",
          host: "smtp.example.com",
          domain: "example.com",
          port: 587,
          security: "tls",
          username: "user",
          password: "secret",
        },
      }

      expect(response).to be_successful
      expect(response.parsed_body["success"]).to be(false)
      expect(response.parsed_body["message"]).to be_present
    end

    it "returns failure for other SMTP errors" do
      smtp_client = instance_double(Net::SMTP)
      allow(Net::SMTP).to receive(:new).and_return(smtp_client)
      allow(smtp_client).to receive(:enable_tls)
      allow(smtp_client).to receive(:start).and_raise(StandardError.new("connection refused"))

      post api_smtp_test_path, params: {
        smtp: {
          name: "Test",
          host: "smtp.example.com",
          domain: "example.com",
          port: 465,
          security: "ssl",
          username: "user",
          password: "secret",
        },
      }

      expect(response).to be_successful
      expect(response.parsed_body["success"]).to be(false)
      expect(response.parsed_body["message"]).to include("connection refused")
    end
  end
end
