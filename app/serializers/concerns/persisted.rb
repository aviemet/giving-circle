module Persisted
  extend ActiveSupport::Concern

  included do
    attributes :id
  end

  class_methods do
    def with_slug
      attributes(
        slug: { type: :string },
      )
    end
  end
end
