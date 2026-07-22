module Admin
  class Settings::BrandingController < Settings::CircleSettingsController
    PRIMARY_COLORS = %w[red pink grape violet indigo blue cyan teal green lime yellow orange].freeze

    strong_params :settings, permit: [:primary_color]

    # @route GET /settings/:circle_slug/branding (settings_branding)
    def index
      render inertia: "Settings/Branding/Index", props: {
        settings: {
          primary_color: circle.settings.primary_color,
        },
      }
    end

    # @route PATCH /settings/:circle_slug/branding (settings_branding)
    def update
      primary_color = settings_params[:primary_color]

      unless PRIMARY_COLORS.include?(primary_color)
        redirect_to settings_branding_path(circle_slug: circle.slug), inertia: {
          errors: { settings: { primary_color: "is not a supported color" } },
        }
        return
      end

      circle.settings.primary_color = primary_color

      if circle.save
        redirect_to settings_branding_path(circle_slug: circle.slug), notice: t("settings.branding.notices.updated")
      else
        redirect_to settings_branding_path(circle_slug: circle.slug), inertia: { errors: circle.errors }
      end
    end

  end
end
