require "net/http"
require "uri"
require "json"

module Messaging
  module Adapters
    class Plivo < Base
      API_BASE = "https://api.plivo.com/v1".freeze

      def deliver_batch(recipients)
        result = BatchResult.new

        recipients.each do |recipient|
          result.add(deliver_one(recipient))
        end

        result
      end

      private

      def deliver_one(recipient)
        uri = URI("#{API_BASE}/Account/#{credential('auth_id')}/Message/")
        request = Net::HTTP::Post.new(uri)
        request.basic_auth(credential("auth_id"), credential("auth_token"))
        request["Content-Type"] = "application/json"
        request.body = {
          src: credential("from_number"),
          dst: recipient.to,
          text: recipient.body,
        }.to_json

        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
          http.request(request)
        end

        payload = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess)
          message_uuid = Array(payload["message_uuid"]).first
          outcome_for(
            recipient,
            status: "sent",
            code: payload["message"] || response.code,
            provider_message_id: message_uuid,
          )
        else
          outcome_for(
            recipient,
            status: "failed",
            code: payload["error_code"]&.to_s || response.code,
            error_message: payload["error"] || payload["message"],
          )
        end
      rescue StandardError => e
        outcome_for(recipient, status: "failed", code: e.class.name, error_message: e.message)
      end
    end
  end
end
