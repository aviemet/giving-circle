require "net/http"
require "uri"
require "json"

module Messaging
  module Adapters
    class Twilio < Base
      API_BASE = "https://api.twilio.com/2010-04-01".freeze

      def deliver_batch(recipients)
        result = BatchResult.new
        by_to = {}

        recipients.each do |recipient|
          outcome = deliver_one(recipient)
          result.add(outcome)
          by_to[normalize_to(recipient.to)] = outcome
        end

        result
      end

      private

      def deliver_one(recipient)
        uri = URI("#{API_BASE}/Accounts/#{credential('account_sid')}/Messages.json")
        request = Net::HTTP::Post.new(uri)
        request.basic_auth(credential("account_sid"), credential("auth_token"))
        request.set_form_data(
          "To" => recipient.to,
          "From" => credential("from_number"),
          "Body" => recipient.body,
        )

        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
          http.request(request)
        end

        payload = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess)
          outcome_for(
            recipient,
            status: "sent",
            code: payload["status"],
            provider_message_id: payload["sid"],
          )
        else
          outcome_for(
            recipient,
            status: "failed",
            code: payload["code"]&.to_s || response.code,
            error_message: payload["message"],
          )
        end
      rescue StandardError => e
        outcome_for(recipient, status: "failed", code: e.class.name, error_message: e.message)
      end

      def normalize_to(value)
        value.to_s.gsub(/\s+/, "")
      end
    end
  end
end
