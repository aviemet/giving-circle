require "net/http"
require "uri"
require "json"

module Messaging
  module Adapters
    class Mailerlite < Base
      API_BASE = "https://connect.mailerlite.com/api".freeze

      def deliver_batch(recipients)
        result = BatchResult.new

        recipients.each do |recipient|
          result.add(deliver_one(recipient))
        end

        result
      end

      private

      def deliver_one(recipient)
        uri = URI("#{API_BASE}/campaigns")
        request = Net::HTTP::Post.new(uri)
        request["Authorization"] = "Bearer #{credential('api_token')}"
        request["Content-Type"] = "application/json"
        request["Accept"] = "application/json"
        request.body = {
          name: "Giving Circle message #{SecureRandom.hex(4)}",
          type: "regular",
          emails: [
            {
              subject: recipient.subject,
              from: credential("from_email"),
              content: recipient.body,
            },
          ],
          filter: [
            {
              operator: "and_join",
              conditions: [
                {
                  type: "email",
                  operator: "equal",
                  value: recipient.to,
                },
              ],
            },
          ],
        }.to_json

        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
          http.request(request)
        end

        payload = JSON.parse(response.body)
        data = payload["data"] || {}
        if response.is_a?(Net::HTTPSuccess)
          outcome_for(
            recipient,
            status: "sent",
            code: data["status"] || response.code,
            provider_message_id: data["id"]&.to_s,
          )
        else
          message = payload.dig("errors", "message") || payload["message"] || response.message
          outcome_for(
            recipient,
            status: "failed",
            code: response.code,
            error_message: message,
          )
        end
      rescue StandardError => e
        outcome_for(recipient, status: "failed", code: e.class.name, error_message: e.message)
      end
    end
  end
end
