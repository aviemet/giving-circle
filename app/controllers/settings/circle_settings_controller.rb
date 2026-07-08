module Admin
  class Settings::CircleSettingsController < ApplicationController
    expose :circle, id: -> { params[:circle_slug] }, scope: -> { settings_circles_scope }, find_by: :slug

    before_action :authorize_circle_settings!

    private

    def settings_circles_scope
      if current_user.has_role?(:super_admin)
        Circle.all
      else
        current_user.circles
      end
    end

    def authorize_circle_settings!
      authorize circle, :manage_settings?, policy_class: CircleSettingsPolicy
    end

    def first_administrable_circle_slug
      if current_user.has_role?(:super_admin)
        Circle.order(:name).pick(:slug)
      else
        current_user.circles.find { |member_circle| current_user.has_role?(:admin, member_circle) }&.slug
      end
    end
  end
end
