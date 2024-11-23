require 'active_support/concern'

module InertiaShare::Menu
  extend ActiveSupport::Concern

  included do
    inertia_share active_circle: lambda { params[:circle_slug] ? Circle.find_by(slug: params[:circle_slug]).render(:inertia_share) : nil }

    inertia_share active_theme: lambda { params[:theme_slug] ? Theme.find_by(slug: params[:theme_slug]).render(:inertia_share) : nil }

    inertia_share active_presentation: lambda { params[:presentation_slug] ? Presentation.find_by(slug: params[:presentation_slug]).render(:inertia_share) : nil }

    inertia_share circles: lambda { current_user&.circles&.render(:inertia_share) }
  end
end
