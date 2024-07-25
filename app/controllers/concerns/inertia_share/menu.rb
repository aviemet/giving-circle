require 'active_support/concern'

module InertiaShare::Menu
  extend ActiveSupport::Concern

  included do
    inertia_share menu: lambda { {
      active_circle: params[:circle_slug] ? Circle.find_by(slug: params[:circle_slug]).render(:inertia_share) : nil,
      active_theme: params[:theme_slug] ? Theme.find_by(slug: params[:theme_slug]).render(:inertia_share) : nil,
      active_presentation: params[:presentation_slug] ? Presentation.find_by(slug: params[:presentation_slug]).render(:inertia_share) : nil,
      circles: current_user&.circles&.render(:inertia_share),
    } }
  end
end
