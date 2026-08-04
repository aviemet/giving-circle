class Presentation::Messages::EditSerializer < Presentation::Messages::FormDataSerializer
  include Persisted
  with_slug
end
