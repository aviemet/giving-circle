module Owned
  extend ActiveSupport::Concern

  included do
    belongs_to :circle, serializer: Circles::PersistedSerializer
  end
end
