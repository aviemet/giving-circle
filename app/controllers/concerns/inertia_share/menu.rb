require "active_support/concern"

module InertiaShare::Menu
  extend ActiveSupport::Concern

  included do
    inertia_share active_circle: lambda {
      return if instance_variable_get(:@disable_menu_rendering)

      if params[:circle_slug]
        # Use the circle from the controller if already loaded
        menu_circle = if defined?(circle) && circle.persisted?
                        circle
                      else
                        Circle.find_by(slug: params[:circle_slug])
                      end
        menu_circle.render(:inertia_share)
      end
    }

    inertia_share active_theme: lambda {
      return if instance_variable_get(:@disable_menu_rendering)

      if params[:theme_slug]
        # Use the theme from the controller if already loaded
        menu_theme = if defined?(theme) && theme.persisted?
                       theme
                     else
                       Theme.find_by(slug: params[:theme_slug])
                     end
        menu_theme.render(:inertia_share)
      end
    }

    inertia_share active_presentation: lambda {
      return if instance_variable_get(:@disable_menu_rendering)

      if params[:presentation_slug]
        # Use the presentation from the controller if already loaded
        menu_presentation = if defined?(presentation) && presentation.persisted?
                              presentation
                            else
                              Presentation.find_by(slug: params[:presentation_slug])
                            end
        menu_presentation.render(:inertia_share)
      end
    }

    inertia_share circles: lambda {
      return if instance_variable_get(:@disable_menu_rendering)

      current_user&.circles&.includes(:themes, :ownerships)&.render(:inertia_share)
    }
  end

  def disable_menu_rendering
    @disable_menu_rendering = true
  end
end
