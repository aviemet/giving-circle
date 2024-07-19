require 'active_support/concern'

module InertiaShare::Params
  extend ActiveSupport::Concern

  included do
    inertia_share params: lambda {
      request.params.to_h.except("controller", "action").select { |_, v| v.is_a?(String) }
    }
  end
end
