require 'active_support/concern'

module InertiaShare::Menu
  extend ActiveSupport::Concern

  included do
    inertia_share menu: lambda { {
      circles: current_user&.circles&.render(:share),
    } }
  end
end
