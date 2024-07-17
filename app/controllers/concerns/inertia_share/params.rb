require 'active_support/concern'

module InertiaShare::Params
  extend ActiveSupport::Concern

  included do
    inertia_share params: lambda { {
      params: request.params.to_h.except("controller", "action"),
    } }
  end
end
