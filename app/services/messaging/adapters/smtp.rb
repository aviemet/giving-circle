require "net/smtp"

module Messaging
  module Adapters
    class Smtp < Base
      def deliver_batch(recipients)
        result = BatchResult.new

        recipients.each do |recipient|
          result.add(deliver_one(recipient))
        end

        result
      end

      private

      def deliver_one(recipient)
        from_address = credential("address").presence || credential("username")
        message = build_message(
          from: from_address,
          to: recipient.to,
          subject: recipient.subject,
          body: recipient.body,
        )

        Net::SMTP.start(
          credential("host"),
          credential("port").to_i,
          credential("domain").presence || credential("host"),
          credential("username"),
          credential("password"),
          smtp_security,
        ) do |smtp|
          smtp.send_message(message, from_address, recipient.to)
        end

        outcome_for(recipient, status: "sent", code: "250")
      rescue StandardError => e
        outcome_for(recipient, status: "failed", code: e.class.name, error_message: e.message)
      end

      def smtp_security
        case credential("security").to_s
        when "ssl"
          :ssl
        when "tls"
          :tls
        end
      end

      def build_message(from:, to:, subject:, body:)
        [
          "From: #{from}",
          "To: #{to}",
          "Subject: #{subject}",
          "MIME-Version: 1.0",
          "Content-Type: text/html; charset=UTF-8",
          "",
          body,
        ].join("\r\n")
      end
    end
  end
end
