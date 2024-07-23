require 'active_support/concern'

module ActiveCircleTracker
  extend ActiveSupport::Concern

  included do
    before_action :set_active_circle
  end

  private

  # Changes active circle for user if provided
  # Sets @active_circle on Controller
  def set_active_circle
    return if !current_user

    if params[:circle_slug] &&
      current_user.active_circle.slug != params[:circle_slug] &&
      !current_user.update!(active_circle: Circle.find_by(slug: params[:circle_slug]))

      redirect_to '/circles', notice: "The resource you are trying to access does not exist"
    end

    if current_user.active_circle
      @active_circle = current_user.active_circle
    elsif ['/circles', '/logout'].exclude?(request.path)
      redirect_to '/circles', notice: "You have not been granted access to that Giving Circle"
    end
  end
end
