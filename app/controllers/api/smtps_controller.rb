require "net/smtp"

class Api::SmtpsController < Api::ApiController
  # @route POST /api/smtp/test (api_smtp_test)
  def test
    render json: test_smtp_auth(Smtp.new(smtp_params)), status: :ok
  end

  private

  def test_smtp_auth(smtp)
    smtp_client = Net::SMTP.new(smtp.host, smtp.port)
    smtp_client.enable_tls if smtp.ssl?
    smtp_client.enable_starttls if smtp.tls?

    smtp_client.start(smtp.domain, smtp.username, smtp.password) do
      { success: true, message: "Authentication successful" }
    end
  rescue Net::SMTPAuthenticationError => e
    { success: false, message: "Authentication failed: #{e.message}" }
  rescue StandardError => e
    { success: false, message: "An error occurred: #{e.message}" }
  end

  def smtp_params
    params.expect(smtp: [:name, :host, :domain, :port, :security, :username, :password, :address, :notes])
  end
end
