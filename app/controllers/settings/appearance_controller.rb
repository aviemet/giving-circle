module Admin
  class Settings::AppearanceController < ApplicationController
    PRIMARY_COLORS = %w[red pink grape violet indigo blue cyan teal green lime yellow orange].freeze
    DEFAULT_PRIMARY_COLOR = "blue".freeze

    strong_params :settings, permit: [:primary_color]

    # @route GET /settings/appearance (settings_appearance)
    def index
      render inertia: "Settings/Appearance/Index", props: {
        settings: {
          primary_color: primary_color_setting,
        },
      }
    end

    # @route PATCH /settings/appearance (settings_appearance)
    def update
      primary_color = settings_params[:primary_color]

      unless PRIMARY_COLORS.include?(primary_color)
        redirect_to settings_appearance_path, inertia: {
          errors: { settings: { primary_color: "is not a supported color" } },
        }
        return
      end

      if current_user.update(user_preferences: current_user.user_preferences.deep_merge("primaryColor" => primary_color))
        redirect_to settings_appearance_path, notice: t("settings.appearance.notices.updated")
      else
        redirect_to settings_appearance_path, inertia: { errors: current_user.errors }
      end
    end

    private

    def primary_color_setting
      current_user.user_preferences["primaryColor"].presence || DEFAULT_PRIMARY_COLOR
    end
  end
end
