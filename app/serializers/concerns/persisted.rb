module Persisted
  extend ActiveSupport::Concern

  included do
    attributes :id, :created_at, :updated_at
  end
end
