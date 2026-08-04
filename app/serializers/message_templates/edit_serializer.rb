class MessageTemplates::EditSerializer < MessageTemplates::FormDataSerializer
  include Persisted
  with_slug
end
