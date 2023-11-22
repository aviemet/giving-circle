class Admin::AdminController < ApplicationController
  before_action :authenticate_user!
  # before_action :set_active_circle

  # def set_active_circle
  #   return if !current_user

  #   if current_user.circles.empty?
  #     if !['/logout', '/circles'].include? request.path
  #       redirect_to circles_path
  #     end
  #   else
  #     if current_user.active_circle.nil?
  #       current_user.active_circle = current_user.circles.first
  #       current_user.save
  #     end
  #     @active_circle = current_user.active_circle
  #   end

  #   if current_user.active_circle
  #     @active_circle = current_user.active_circle
  #   elsif !['/logout', '/circles'].include? request.path
  #     redirect_to circles_path
  #   end
  # end

end
