module EncryptedJsonCredentials
  extend ActiveSupport::Concern

  def credentials
    raw = self[:credentials]
    return {} if raw.blank?

    begin
      parsed = JSON.parse(credentials_encryptor.decrypt_and_verify(raw))
    rescue ActiveSupport::MessageEncryptor::InvalidMessage
      parsed = JSON.parse(raw)
    end

    parsed.is_a?(Hash) ? parsed : {}
  rescue JSON::ParserError
    {}
  end

  def credentials=(value)
    json = value.is_a?(String) ? value : value.to_json
    self[:credentials] = credentials_encryptor.encrypt_and_sign(json)
  end

  private

  def credentials_encryptor
    key = ActiveSupport::KeyGenerator.new(
      Rails.application.secret_key_base,
    ).generate_key("giving-circle/integration-credentials", 32)
    ActiveSupport::MessageEncryptor.new(key)
  end
end
